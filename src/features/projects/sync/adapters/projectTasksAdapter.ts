/**
 * Adapter #1 — project Tasks (SPEC §6).
 * Pure mappers only; pageLocal/pageNeon I/O stay at History/Dispatch edges.
 * Neon allowlist = meta only (§6.1). Interim Neon meta via agent_runs (579b18ff).
 */

import {
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
  type ProjectSyncVersion,
  type ProjectTaskUiStatus,
} from "@/features/projects/sync/projectSync.types";

export const PROJECT_TASKS_TABLE_ID = "project_tasks";
export const PROJECT_TASKS_SCHEMA_VERSION = 1;

/** Local authoritative task / AI-session record (AWL tasks/ + sync fields). */
export type ProjectTaskLocalRecord = {
  readonly id: string;
  readonly projectId: string;
  readonly assistantMembershipId: string | null;
  readonly title: string;
  readonly status: ProjectTaskUiStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly version: number;
  readonly sessionId: string | null;
  readonly agentRunId: string | null;
  readonly branch: string | null;
  readonly worktree: string | null;
  /** Local-only — never to Neon. */
  readonly prompt: string;
  readonly body: string;
  readonly report: string | null;
  readonly logs: string | null;
};

/** Neon meta allowlist (SPEC §6.1). No body/prompt/report/logs. */
export type ProjectTaskNeonMeta = {
  readonly id: string;
  readonly projectId: string;
  readonly assistantMembershipId: string | null;
  readonly title: string;
  readonly status: ProjectTaskUiStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly version: number;
  readonly sessionId: string | null;
  readonly agentRunId: string | null;
  readonly branch: string | null;
  readonly worktree: string | null;
  /** Null until local claims a web-created pending row. */
  readonly localClaimedAt: string | null;
};

/** IDB cache shape — meta + optional thin snippet (not full body). */
export type ProjectTaskIdbRecord = {
  readonly id: string;
  readonly projectId: string;
  readonly assistantMembershipId: string | null;
  readonly title: string;
  readonly status: ProjectTaskUiStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly startedAt: string | null;
  readonly endedAt: string | null;
  readonly version: number;
  readonly sessionId: string | null;
  readonly agentRunId: string | null;
  readonly branch: string | null;
  readonly worktree: string | null;
  readonly snippet: string | null;
};

/** Exact Neon meta keys — allowlist for upserts (Dispatch wires later). */
export const PROJECT_TASK_NEON_FIELDS = [
  "id",
  "projectId",
  "assistantMembershipId",
  "title",
  "status",
  "createdAt",
  "updatedAt",
  "startedAt",
  "endedAt",
  "version",
  "sessionId",
  "agentRunId",
  "branch",
  "worktree",
  "localClaimedAt",
] as const satisfies readonly (keyof ProjectTaskNeonMeta)[];

export const PROJECT_TASK_LOCAL_ONLY_FIELDS = [
  "prompt",
  "body",
  "report",
  "logs",
] as const satisfies readonly (keyof ProjectTaskLocalRecord)[];

export const PROJECT_TASK_IDB_FIELDS = [
  "id",
  "projectId",
  "assistantMembershipId",
  "title",
  "status",
  "createdAt",
  "updatedAt",
  "startedAt",
  "endedAt",
  "version",
  "sessionId",
  "agentRunId",
  "branch",
  "worktree",
  "snippet",
] as const satisfies readonly (keyof ProjectTaskIdbRecord)[];

const BODY_FIELD_NAMES = new Set<string>([
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
]);

/**
 * Map local/assignment statuses → UI chips (SPEC §11 Soft pick).
 * working→running; assigned|pending_approval→queued; done/failed/cancelled 1:1;
 * unknown→queued.
 */
export const mapProjectTaskStatusToUi = (
  raw: string,
): ProjectTaskUiStatus => {
  const normalized = raw.trim().toLowerCase();
  switch (normalized) {
    case "working":
    case "running":
      return "running";
    case "assigned":
    case "pending_approval":
    case "queued":
    case "pending":
      return "queued";
    case "done":
    case "completed":
      return "done";
    case "failed":
    case "error":
      return "failed";
    case "cancelled":
    case "canceled":
      return "cancelled";
    default:
      return "queued";
  }
};

const thinTitle = (raw: string): string =>
  raw.trim().replace(/\s+/g, " ").slice(0, PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS);

export const keyOfProjectTask = (
  record: ProjectTaskLocalRecord | ProjectTaskNeonMeta | ProjectTaskIdbRecord,
): string => record.id;

export const versionOfProjectTask = (
  record: ProjectTaskLocalRecord | ProjectTaskNeonMeta | ProjectTaskIdbRecord,
): ProjectSyncVersion => ({
  version: record.version,
  updatedAt: record.updatedAt,
});

/**
 * Local wins if version >, else if == then updatedAt >, else key string >.
 * Returns >0 when `a` should win over `b`.
 */
export const compareVersionProjectTask = (
  a: ProjectTaskLocalRecord | ProjectTaskNeonMeta | ProjectTaskIdbRecord,
  b: ProjectTaskLocalRecord | ProjectTaskNeonMeta | ProjectTaskIdbRecord,
): number => {
  if (a.version !== b.version) {
    return a.version > b.version ? 1 : -1;
  }
  if (a.updatedAt !== b.updatedAt) {
    return a.updatedAt > b.updatedAt ? 1 : -1;
  }
  const aKey = keyOfProjectTask(a);
  const bKey = keyOfProjectTask(b);
  if (aKey === bKey) return 0;
  return aKey > bKey ? 1 : -1;
};

export const sortKeyProjectTask = (
  row: ProjectTaskLocalRecord | ProjectTaskNeonMeta | ProjectTaskIdbRecord,
): { readonly t: string; readonly id: string } => ({
  t: row.createdAt,
  id: row.id,
});

/** Pure — meta allowlist only; strips local-only / body fields. */
export const toNeonMetaProjectTask = (
  local: ProjectTaskLocalRecord,
): ProjectTaskNeonMeta => ({
  id: local.id,
  projectId: local.projectId,
  assistantMembershipId: local.assistantMembershipId,
  title: thinTitle(local.title),
  status: local.status,
  createdAt: local.createdAt,
  updatedAt: local.updatedAt,
  startedAt: local.startedAt,
  endedAt: local.endedAt,
  version: local.version,
  sessionId: local.sessionId,
  agentRunId: local.agentRunId,
  branch: local.branch,
  worktree: local.worktree,
  localClaimedAt: local.updatedAt,
});

/** Pure — local authoritative merge; bump version when incoming wins structurally. */
export const mergeLocalProjectTask = (
  prev: ProjectTaskLocalRecord | null,
  incoming: ProjectTaskLocalRecord,
): ProjectTaskLocalRecord => {
  if (prev === null) {
    return incoming;
  }
  if (compareVersionProjectTask(incoming, prev) >= 0) {
    return incoming;
  }
  return prev;
};


/**
 * T4 harden (Lead Soft FIX Soft Soft + Arch add-on): local SoT body/title/prompt
 * always wins — dirty *or clean*. Neon-newer may refresh meta fields only
 * (status/times/branch/worktree/session ids/version); never replace local body,
 * title, prompt, report, or logs. Alias: preferLocalOverNeonNewer.
 */
export const preferLocalDirtyOverNeonNewer = (
  local: ProjectTaskLocalRecord,
  neon: ProjectTaskNeonMeta,
): {
  readonly winner: ProjectTaskLocalRecord;
  readonly neonNewerSkipped: boolean;
  readonly metaRefreshedFromNeon: boolean;
} => {
  const neonNewer = compareVersionProjectTask(neon, local) > 0;
  if (!neonNewer) {
    return {
      winner: local,
      neonNewerSkipped: false,
      metaRefreshedFromNeon: false,
    };
  }
  // Neon newer → meta-only refresh; local body/title/prompt stay authoritative.
  const winner: ProjectTaskLocalRecord = {
    id: local.id,
    projectId: local.projectId,
    assistantMembershipId:
      neon.assistantMembershipId ?? local.assistantMembershipId,
    title: local.title,
    status: neon.status,
    createdAt: local.createdAt,
    updatedAt: neon.updatedAt,
    startedAt: neon.startedAt,
    endedAt: neon.endedAt,
    version: neon.version,
    sessionId: neon.sessionId ?? local.sessionId,
    agentRunId: neon.agentRunId ?? local.agentRunId,
    branch: neon.branch ?? local.branch,
    worktree: neon.worktree ?? local.worktree,
    prompt: local.prompt,
    body: local.body,
    report: local.report,
    logs: local.logs,
  };
  return {
    winner,
    neonNewerSkipped: true,
    metaRefreshedFromNeon: true,
  };
};

/** Arch alias — clean local keeps body the same as dirty. */
export const preferLocalOverNeonNewer = preferLocalDirtyOverNeonNewer;

/** Pure — IDB cache from local or neon meta (snippet optional; never full body). */
export const toIdbProjectTask = (
  record: ProjectTaskLocalRecord | ProjectTaskNeonMeta,
): ProjectTaskIdbRecord => {
  const snippet =
    "prompt" in record && typeof record.prompt === "string"
      ? thinTitle(record.prompt)
      : "title" in record
        ? thinTitle(record.title)
        : null;
  return {
    id: record.id,
    projectId: record.projectId,
    assistantMembershipId: record.assistantMembershipId,
    title: thinTitle(record.title),
    status: record.status,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    startedAt: record.startedAt,
    endedAt: record.endedAt,
    version: record.version,
    sessionId: record.sessionId,
    agentRunId: record.agentRunId,
    branch: record.branch,
    worktree: record.worktree,
    snippet: snippet !== null && snippet.length > 0 ? snippet : null,
  };
};

/**
 * Guard: ensure a putative Neon meta object has no body fields.
 * Used by tests and Dispatch allowlist checks.
 */
export const assertProjectTaskNeonMetaAllowlist = (
  meta: Readonly<Record<string, unknown>>,
): readonly string[] => {
  const offenders: string[] = [];
  for (const key of Object.keys(meta)) {
    if (BODY_FIELD_NAMES.has(key)) {
      offenders.push(key);
    }
    if (
      !(PROJECT_TASK_NEON_FIELDS as readonly string[]).includes(key)
    ) {
      offenders.push(key);
    }
  }
  return offenders;
};

/**
 * Map C1 AI session record → local task shape (version defaults to 1).
 * History OFF keeps tasks/ — this mapper does not purge.
 */
export const projectTaskLocalFromAiSession = (input: {
  readonly taskId: string;
  readonly projectId: string;
  readonly status: string;
  readonly promptSummary: string;
  readonly resultSummary: string;
  readonly createdAt: string;
  readonly completedAt: string | null;
  readonly writerAgent: string | null;
  readonly agentRunId: string | null;
  readonly savedAt: string;
  readonly version?: number;
  readonly branch?: string | null;
  readonly worktree?: string | null;
  readonly assistantMembershipId?: string | null;
}): ProjectTaskLocalRecord => {
  const id =
    input.agentRunId !== null && input.agentRunId.trim().length > 0
      ? input.agentRunId.trim()
      : input.taskId;
  const title =
    input.resultSummary.trim().length > 0
      ? input.resultSummary
      : input.promptSummary;
  return {
    id,
    projectId: input.projectId,
    assistantMembershipId: input.assistantMembershipId ?? null,
    title: thinTitle(title),
    status: mapProjectTaskStatusToUi(input.status),
    createdAt: input.createdAt,
    updatedAt: input.savedAt,
    startedAt: input.createdAt,
    endedAt: input.completedAt,
    version: input.version ?? 1,
    sessionId: input.agentRunId,
    agentRunId: input.agentRunId,
    branch: input.branch ?? null,
    worktree: input.worktree ?? null,
    prompt: input.promptSummary,
    body: input.resultSummary,
    report: null,
    logs: null,
  };
};

export const projectTasksAdapter = {
  tableId: PROJECT_TASKS_TABLE_ID,
  schemaVersion: PROJECT_TASKS_SCHEMA_VERSION,
  keyOf: keyOfProjectTask,
  versionOf: versionOfProjectTask,
  compareVersion: compareVersionProjectTask,
  sortKey: sortKeyProjectTask,
  neonFields: PROJECT_TASK_NEON_FIELDS,
  localOnlyFields: PROJECT_TASK_LOCAL_ONLY_FIELDS,
  idbFields: PROJECT_TASK_IDB_FIELDS,
  toNeonMeta: toNeonMetaProjectTask,
  mergeLocal: mergeLocalProjectTask,
  preferLocalDirtyOverNeonNewer,
  preferLocalOverNeonNewer,
  toIdb: toIdbProjectTask,
} as const;
