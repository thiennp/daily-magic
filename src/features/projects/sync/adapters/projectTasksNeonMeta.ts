/**
 * Tasks Neon meta I/O — Dispatch pageNeon (SPEC §6.1 Neon / §7).
 * Reuses History adapter types/allowlist (DRY). Interim storage: agent_runs.
 * HARD: never select/write full prompt, result_output, body, logs, reports.
 */

import { scrubOutboundSecrets } from "@agent-witch/shared/dispatch";
import { asRowArray, getSql } from "@/lib/db";
import {
  assertProjectTaskNeonMetaAllowlist,
  mapProjectTaskStatusToUi,
  PROJECT_TASK_NEON_FIELDS,
  PROJECT_TASKS_SCHEMA_VERSION,
  PROJECT_TASKS_TABLE_ID,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";
import type { NeonMetaPageResult } from "@/features/projects/sync/adapters/neonMetaAdapter";
import {
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
  type ProjectSyncCursor,
} from "@/features/projects/sync/projectSync.types";
import {
  AgentRunStatus,
  type AgentRunStatusValue,
} from "@/lib/dispatch/AgentRunStatus.constant";
import { isTerminalAgentRunStatus } from "@/lib/dispatch/isTerminalAgentRunStatus";

/** Body / payload keys that MUST NEVER enter Neon meta. */
export const PROJECT_TASK_NEON_BODY_FIELD_DENYLIST = [
  "prompt",
  "body",
  "report",
  "logs",
  "result_output",
  "resultOutput",
  "timeline",
  "history",
  "attachments",
  "skillPayload",
  "transcript",
  "events",
] as const;

const BODY_FIELD_NAMES = new Set<string>(PROJECT_TASK_NEON_BODY_FIELD_DENYLIST);
const ALLOWLIST_SET = new Set<string>(PROJECT_TASK_NEON_FIELDS);

/** Soft Neon meta row cap per project (purge oldest beyond this). */
export const PROJECT_TASK_NEON_META_ROW_CAP = 500;

/** Known status tokens accepted on Neon meta upsert (absent/unknown → 400). */
export const PROJECT_TASK_NEON_META_STATUS_TOKENS = [
  "working",
  "running",
  "assigned",
  "pending_approval",
  "queued",
  "pending",
  "done",
  "completed",
  "failed",
  "error",
  "cancelled",
  "canceled",
] as const;

const KNOWN_STATUS_TOKENS = new Set<string>(
  PROJECT_TASK_NEON_META_STATUS_TOKENS,
);

/**
 * Map UI chip → agent_runs status for sync writeback.
 * HARD: never returns pending_approval (queued → null = no status write).
 */
export const mapProjectTaskUiStatusToAgentRun = (
  status: ProjectTaskNeonMeta["status"],
): AgentRunStatusValue | null => {
  switch (status) {
    case "queued":
      return null;
    case "running":
      return AgentRunStatus.RUNNING;
    case "done":
      return AgentRunStatus.COMPLETED;
    case "failed":
      return AgentRunStatus.FAILED;
    case "cancelled":
      return AgentRunStatus.DENIED;
    default:
      return null;
  }
};

/** Forward-only Neon status transitions allowed from sync (current → next). */
export const AGENT_RUN_SYNC_FORWARD_TRANSITIONS: Readonly<
  Record<string, ReadonlySet<AgentRunStatusValue>>
> = {
  [AgentRunStatus.PENDING_APPROVAL]: new Set([
    AgentRunStatus.RUNNING,
    AgentRunStatus.COMPLETED,
    AgentRunStatus.FAILED,
    AgentRunStatus.DENIED,
    AgentRunStatus.EXPIRED,
  ]),
  [AgentRunStatus.RUNNING]: new Set([
    AgentRunStatus.RUNNING,
    AgentRunStatus.COMPLETED,
    AgentRunStatus.FAILED,
    AgentRunStatus.DENIED,
    AgentRunStatus.EXPIRED,
  ]),
  [AgentRunStatus.COMPLETED]: new Set(),
  [AgentRunStatus.FAILED]: new Set(),
  [AgentRunStatus.DENIED]: new Set(),
  [AgentRunStatus.EXPIRED]: new Set(),
};

export type DecideAgentRunSyncStatusWriteInput = {
  readonly currentStatus: string;
  readonly currentUpdatedAt: string | null;
  readonly incomingUiStatus: ProjectTaskNeonMeta["status"];
  readonly incomingUpdatedAt: string;
  readonly currentVersion?: number;
  readonly incomingVersion?: number;
};

export type DecideAgentRunSyncStatusWriteResult =
  | { readonly action: "write"; readonly status: AgentRunStatusValue }
  | {
      readonly action: "skip";
      readonly reason:
        | "terminal"
        | "no_status_write"
        | "invalid_transition"
        | "stale"
        | "pending_approval_forbidden";
    };

const isAgentRunStatusLike = (value: string): value is AgentRunStatusValue =>
  value === AgentRunStatus.PENDING_APPROVAL ||
  value === AgentRunStatus.RUNNING ||
  value === AgentRunStatus.COMPLETED ||
  value === AgentRunStatus.FAILED ||
  value === AgentRunStatus.DENIED ||
  value === AgentRunStatus.EXPIRED;

const isStaleSyncMeta = (
  input: DecideAgentRunSyncStatusWriteInput,
): boolean => {
  if (
    typeof input.currentVersion === "number" &&
    typeof input.incomingVersion === "number" &&
    input.incomingVersion < input.currentVersion
  ) {
    return true;
  }
  const currentAt = input.currentUpdatedAt?.trim() ?? "";
  const incomingAt = input.incomingUpdatedAt.trim();
  if (currentAt.length > 0 && incomingAt.length > 0 && incomingAt < currentAt) {
    return true;
  }
  return false;
};

/**
 * Pure FSM for interim agent_runs sync UPDATE.
 * Terminal → no-op; never pending_approval; forward-only; staleness guard.
 */
export const decideAgentRunSyncStatusWrite = (
  input: DecideAgentRunSyncStatusWriteInput,
): DecideAgentRunSyncStatusWriteResult => {
  const current = input.currentStatus.trim().toLowerCase();
  if (
    isAgentRunStatusLike(current) && isTerminalAgentRunStatus(current)
  ) {
    return { action: "skip", reason: "terminal" };
  }

  const next = mapProjectTaskUiStatusToAgentRun(input.incomingUiStatus);
  if (next === null) {
    return { action: "skip", reason: "no_status_write" };
  }
  if (next === AgentRunStatus.PENDING_APPROVAL) {
    return { action: "skip", reason: "pending_approval_forbidden" };
  }

  const allowed = AGENT_RUN_SYNC_FORWARD_TRANSITIONS[current];
  if (!allowed || !allowed.has(next)) {
    return { action: "skip", reason: "invalid_transition" };
  }

  if (isStaleSyncMeta(input)) {
    return { action: "skip", reason: "stale" };
  }

  return { action: "write", status: next };
};

/**
 * Basename path-like worktree (and absolute branch) before project_tasks mig.
 * worktree: strip values with / \ ~ or drive letter to basename.
 * branch: keep feat/csv; only strip absolute / ~ / drive / backslash paths.
 */
export const sanitizeNeonMetaRefName = (
  value: string,
  kind: "worktree" | "branch",
): string => {
  const trimmed = value.trim();
  if (trimmed.length === 0) return trimmed;
  const backslash = "\\";
  const pathLike =
    trimmed.includes(backslash) ||
    trimmed.startsWith("~") ||
    trimmed.startsWith("/") ||
    /^[A-Za-z]:[\\/]/.test(trimmed) ||
    (kind === "worktree" && trimmed.includes("/"));
  if (!pathLike) return trimmed;
  const normalized = trimmed.split(backslash).join("/");
  const base = normalized.split("/").filter((p) => p.length > 0).pop();
  return base && base.length > 0 ? base : trimmed;
};

/**
 * Scrub + cap title/summary ≤ PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS (200).
 */
export const scrubNeonMetaTitle = (raw: string): string => {
  const scrubbed = scrubOutboundSecrets(raw)
    .scrubbed.replace(/\s+/g, " ")
    .trim();
  if (scrubbed.length <= PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS) {
    return scrubbed;
  }
  return `${scrubbed.slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS - 1)}…`;
};

/**
 * Strip to allowlist only. Rejects (throws) when body denylist keys present.
 * Uses History assert + Dispatch denylist (result_output etc.).
 */
export const pickProjectTaskNeonMetaAllowlist = (
  input: Readonly<Record<string, unknown>>,
): ProjectTaskNeonMeta => {
  const bodyHits = Object.keys(input).filter((key) =>
    BODY_FIELD_NAMES.has(key),
  );
  if (bodyHits.length > 0) {
    throw new Error(
      `Neon meta reject: body fields not allowed (${bodyHits.join(", ")})`,
    );
  }
  const historyOffenders = assertProjectTaskNeonMetaAllowlist(input);
  const unknown = historyOffenders.filter((key) => !BODY_FIELD_NAMES.has(key));
  // Unknown non-body keys are stripped below (not thrown) — KISS for reconcile.
  void unknown;
  void ALLOWLIST_SET;

  const titleRaw = typeof input.title === "string" ? input.title : "";
  if (typeof input.status !== "string" || input.status.trim().length === 0) {
    throw new Error("Neon meta reject: status required");
  }
  const statusRaw = input.status.trim();
  if (!KNOWN_STATUS_TOKENS.has(statusRaw.toLowerCase())) {
    throw new Error(
      `Neon meta reject: unknown status (${statusRaw})`,
    );
  }
  const branchRaw = typeof input.branch === "string" ? input.branch : null;
  const worktreeRaw =
    typeof input.worktree === "string" ? input.worktree : null;
  return {
    id: String(input.id ?? ""),
    projectId: String(input.projectId ?? ""),
    assistantMembershipId:
      typeof input.assistantMembershipId === "string"
        ? input.assistantMembershipId
        : null,
    title: scrubNeonMetaTitle(titleRaw),
    status: mapProjectTaskStatusToUi(statusRaw),
    createdAt: String(input.createdAt ?? ""),
    updatedAt: String(input.updatedAt ?? ""),
    startedAt:
      typeof input.startedAt === "string" ? input.startedAt : null,
    endedAt: typeof input.endedAt === "string" ? input.endedAt : null,
    version: Number(input.version ?? 1) || 1,
    sessionId:
      typeof input.sessionId === "string" ? input.sessionId : null,
    agentRunId:
      typeof input.agentRunId === "string" ? input.agentRunId : null,
    branch:
      branchRaw === null ? null : sanitizeNeonMetaRefName(branchRaw, "branch"),
    worktree:
      worktreeRaw === null
        ? null
        : sanitizeNeonMetaRefName(worktreeRaw, "worktree"),
    localClaimedAt:
      typeof input.localClaimedAt === "string"
        ? input.localClaimedAt
        : null,
  };
};

/** Re-export History allowlist assert for Dispatch tests. */
export { assertProjectTaskNeonMetaAllowlist, PROJECT_TASK_NEON_FIELDS };

/** Pure map from interim agent_runs meta row (no full prompt). */
export const mapAgentRunRowToTaskNeonMeta = (input: {
  readonly id: string;
  readonly projectId: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly writerAgent: string | null;
  /** Already truncated ≤200 at SQL edge; scrubbed here. */
  readonly titleSrc: string;
  readonly version?: number;
}): ProjectTaskNeonMeta => {
  const titleFromPrompt = scrubNeonMetaTitle(input.titleSrc);
  const title =
    titleFromPrompt.length > 0
      ? titleFromPrompt
      : input.writerAgent !== null && input.writerAgent.length > 0
        ? input.writerAgent
        : mapProjectTaskStatusToUi(input.status);
  return {
    id: input.id,
    projectId: input.projectId,
    assistantMembershipId: null,
    title,
    status: mapProjectTaskStatusToUi(input.status),
    createdAt: input.createdAt,
    updatedAt: input.updatedAt,
    startedAt: input.startedAt,
    endedAt: input.endedAt,
    version: input.version ?? 1,
    sessionId: input.id,
    agentRunId: input.id,
    branch: null,
    worktree: null,
    localClaimedAt: null,
  };
};

/**
 * Tasks pageNeon — interim agent_runs meta only.
 * Selects LEFT(prompt, 200) as title_src (never full prompt / result_output).
 */
export const pageNeonProjectTasks = async (input: {
  readonly projectId: string;
  readonly before: ProjectSyncCursor | null;
  readonly limit: number;
}): Promise<NeonMetaPageResult<ProjectTaskNeonMeta>> => {
  const fetchLimit = Math.max(1, Math.floor(input.limit)) + 1;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT r.id, r.project_id, r.status, r.writer_agent,
        to_char(r.created_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS created_at,
        to_char(r.updated_at AT TIME ZONE 'UTC',
          'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS updated_at,
        CASE WHEN r.started_at IS NULL THEN NULL ELSE
          to_char(r.started_at AT TIME ZONE 'UTC',
            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') END AS started_at,
        CASE WHEN r.completed_at IS NULL THEN NULL ELSE
          to_char(r.completed_at AT TIME ZONE 'UTC',
            'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') END AS ended_at,
        LEFT(r.prompt, ${PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS}::int) AS title_src
      FROM agent_runs r
      WHERE r.project_id = ${input.projectId}
        AND (${input.before?.t ?? null}::timestamptz IS NULL
          OR (r.created_at, r.id) < (
            ${input.before?.t ?? null}::timestamptz,
            ${input.before?.id ?? null}::text
          ))
      ORDER BY r.created_at DESC, r.id DESC
      LIMIT ${fetchLimit}::int
    `,
  );

  const hasMore = rows.length > input.limit;
  const pageRows = hasMore ? rows.slice(0, input.limit) : rows;
  const entries = pageRows.map((row) =>
    mapAgentRunRowToTaskNeonMeta({
      id: String(row.id),
      projectId: String(row.project_id ?? input.projectId),
      status: String(row.status ?? "failed"),
      createdAt:
        typeof row.created_at === "string" ? row.created_at : "",
      updatedAt:
        typeof row.updated_at === "string" ? row.updated_at : "",
      startedAt:
        typeof row.started_at === "string" ? row.started_at : null,
      endedAt: typeof row.ended_at === "string" ? row.ended_at : null,
      writerAgent:
        typeof row.writer_agent === "string" ? row.writer_agent : null,
      titleSrc: typeof row.title_src === "string" ? row.title_src : "",
    }),
  );
  return { entries, hasMore };
};

/**
 * Pure Neon meta row-cap purge: keep newest `cap` by (createdAt, id).
 */
export const purgeProjectTaskNeonMetaBeyondCap = (
  rows: readonly ProjectTaskNeonMeta[],
  cap: number = PROJECT_TASK_NEON_META_ROW_CAP,
): {
  readonly kept: readonly ProjectTaskNeonMeta[];
  readonly purged: readonly ProjectTaskNeonMeta[];
} => {
  const sorted = [...rows].sort((a, b) => {
    if (a.createdAt !== b.createdAt) {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    return a.id < b.id ? 1 : -1;
  });
  const safeCap = Math.max(0, Math.floor(cap));
  return {
    kept: sorted.slice(0, safeCap),
    purged: sorted.slice(safeCap),
  };
};

export const projectTasksNeonMetaAdapter = {
  tableId: PROJECT_TASKS_TABLE_ID,
  schemaVersion: PROJECT_TASKS_SCHEMA_VERSION,
  neonFields: PROJECT_TASK_NEON_FIELDS,
  pageNeon: pageNeonProjectTasks,
} as const;

export type { ProjectTaskNeonMeta };
