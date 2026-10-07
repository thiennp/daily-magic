import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { isLocalProjectHistoryOn } from "./isLocalProjectHistoryOn";
import { readLocalProjectHistoryState } from "./localProjectHistoryState";
import type { ProjectHistoryAiSessionRecord } from "./projectHistoryAiSessionRecord.type";
import { PROJECT_HISTORY_TASKS_DIR_NAME } from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";
import { scrubProjectHistorySkillgenSecrets } from "./scrubProjectHistorySkillgenSecrets";

const LOG_PREFIX = "[project-history-ai-session]";
const SUMMARY_MAX_CHARS = 280;

const isSafeTaskId = (taskId: string): boolean =>
  taskId.length > 0 &&
  taskId.length <= 200 &&
  !taskId.includes("/") &&
  !taskId.includes("\\") &&
  !taskId.includes("..") &&
  !taskId.startsWith(".");

const scrubSummary = (raw: string): string => {
  const trimmed = raw.trim().replace(/\s+/g, " ").slice(0, SUMMARY_MAX_CHARS);
  if (trimmed.length === 0) {
    return "";
  }
  const scrubbed = scrubProjectHistorySkillgenSecrets(trimmed);
  if (scrubbed.residualSecret) {
    return "[redacted]";
  }
  return scrubbed.scrubbed;
};

/** Full-body secret scrub (uncapped). Residual → "[redacted]". */
const scrubBody = (raw: string): string => {
  if (raw.length === 0) {
    return "";
  }
  const scrubbed = scrubProjectHistorySkillgenSecrets(raw);
  if (scrubbed.residualSecret) {
    return "[redacted]";
  }
  return scrubbed.scrubbed;
};

const scrubOptionalBody = (raw: string | null): string | null => {
  if (raw === null) {
    return null;
  }
  return scrubBody(raw);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readOptionalBody = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }
  return value;
};

/** Best-effort read of an existing C1 task file for merge on update. */
const readExistingAiSession = (
  filePath: string,
): ProjectHistoryAiSessionRecord | null => {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isRecord(parsed)) {
      return null;
    }
    const taskId =
      typeof parsed.taskId === "string" && parsed.taskId.trim().length > 0
        ? parsed.taskId.trim()
        : null;
    const projectId =
      typeof parsed.projectId === "string" && parsed.projectId.trim().length > 0
        ? parsed.projectId.trim()
        : null;
    const status =
      typeof parsed.status === "string" && parsed.status.trim().length > 0
        ? parsed.status.trim()
        : null;
    const createdAt =
      typeof parsed.createdAt === "string" && parsed.createdAt.trim().length > 0
        ? parsed.createdAt.trim()
        : null;
    const savedAt =
      typeof parsed.savedAt === "string" && parsed.savedAt.trim().length > 0
        ? parsed.savedAt.trim()
        : null;
    if (
      taskId === null ||
      projectId === null ||
      status === null ||
      createdAt === null ||
      savedAt === null
    ) {
      return null;
    }
    const threadRaw = parsed.threadKey;
    const threadKey =
      threadRaw === null || threadRaw === undefined
        ? null
        : typeof threadRaw === "string" && threadRaw.trim().length > 0
          ? threadRaw.trim()
          : null;
    return {
      taskId,
      projectId,
      threadKey,
      writerAgent:
        typeof parsed.writerAgent === "string" &&
        parsed.writerAgent.trim().length > 0
          ? parsed.writerAgent.trim()
          : null,
      status,
      promptSummary:
        typeof parsed.promptSummary === "string" ? parsed.promptSummary : "",
      resultSummary:
        typeof parsed.resultSummary === "string" ? parsed.resultSummary : "",
      promptBody: readOptionalBody(parsed.promptBody),
      resultBody: readOptionalBody(parsed.resultBody),
      createdAt,
      completedAt:
        parsed.completedAt === null || parsed.completedAt === undefined
          ? null
          : typeof parsed.completedAt === "string" &&
              parsed.completedAt.trim().length > 0
            ? parsed.completedAt.trim()
            : null,
      agentRunId:
        typeof parsed.agentRunId === "string" &&
        parsed.agentRunId.trim().length > 0
          ? parsed.agentRunId.trim()
          : null,
      savedAt,
    };
  } catch {
    return null;
  }
};

export type WriteProjectHistoryAiSessionInput = {
  readonly projectId: string;
  readonly taskId: string;
  readonly status: string;
  /** Scrubbed/display summary; derived from promptBody when omitted/empty. */
  readonly promptSummary?: string;
  /** Scrubbed/display summary; derived from resultBody when omitted/empty. */
  readonly resultSummary?: string;
  /**
   * Full prompt for local SoT (secret-scrubbed on write). When provided
   * (including empty string), replaces any existing promptBody. When omitted,
   * existing promptBody is preserved.
   */
  readonly promptBody?: string | null;
  /**
   * Full result for local SoT (secret-scrubbed on write). When provided
   * (including empty string), replaces any existing resultBody. When omitted,
   * existing resultBody is preserved.
   */
  readonly resultBody?: string | null;
  readonly createdAt?: string;
  readonly completedAt?: string | null;
  readonly writerAgent?: string | null;
  readonly threadKey?: string | null;
  readonly agentRunId?: string | null;
};

export type WriteProjectHistoryAiSessionResult =
  | { readonly ok: true; readonly record: ProjectHistoryAiSessionRecord }
  | {
      readonly ok: false;
      readonly reason:
        | "invalid_task_id"
        | "history_off"
        | "history_unknown"
        | "write_failed";
    };

/**
 * Persist an AI session when History is confirmed ON locally and a projectId
 * is known. Stores scrubbed summaries (≤280) for timeline AND optional full
 * promptBody/resultBody (secret-scrubbed, uncapped) as project-computer
 * local SoT (never Neon). History OFF keeps existing tasks/ (no purge here).
 * No-op (ok:false) when History is off or unknown.
 * Merges with an existing tasks/<id>.json so create can write prompt and
 * terminal can later attach result without wiping the other body.
 */
export const writeProjectHistoryAiSession = (
  input: WriteProjectHistoryAiSessionInput,
): WriteProjectHistoryAiSessionResult => {
  const projectId = input.projectId.trim();
  const taskId = input.taskId.trim();
  if (!isSafeTaskId(taskId)) {
    return { ok: false, reason: "invalid_task_id" };
  }

  const local = readLocalProjectHistoryState(projectId);
  if (local === null) {
    return { ok: false, reason: "history_unknown" };
  }
  if (!isLocalProjectHistoryOn(local.state)) {
    return { ok: false, reason: "history_off" };
  }

  const now = new Date().toISOString();
  const agentRunId =
    typeof input.agentRunId === "string" && input.agentRunId.trim().length > 0
      ? input.agentRunId.trim()
      : taskId;
  const fileBase =
    agentRunId.length > 0 && isSafeTaskId(agentRunId) ? agentRunId : taskId;
  if (!isSafeTaskId(fileBase)) {
    return { ok: false, reason: "invalid_task_id" };
  }

  let root: string;
  try {
    root = ensureProjectDataTree(projectId);
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "write_failed", projectId, taskId, error);
    return { ok: false, reason: "write_failed" };
  }

  const filePath = path.join(
    root,
    PROJECT_HISTORY_TASKS_DIR_NAME,
    `${fileBase}.json`,
  );
  const existing = readExistingAiSession(filePath);

  // Scrub secrets on newly supplied bodies; preserve already-scrubbed existing.
  const promptBody =
    input.promptBody !== undefined
      ? scrubOptionalBody(input.promptBody)
      : (existing?.promptBody ?? null);
  const resultBody =
    input.resultBody !== undefined
      ? scrubOptionalBody(input.resultBody)
      : (existing?.resultBody ?? null);

  const promptSummarySource =
    typeof input.promptSummary === "string" &&
    input.promptSummary.trim().length > 0
      ? input.promptSummary
      : (promptBody ?? existing?.promptSummary ?? "");
  const resultSummarySource =
    typeof input.resultSummary === "string" &&
    input.resultSummary.trim().length > 0
      ? input.resultSummary
      : (resultBody ?? existing?.resultSummary ?? "");

  const record: ProjectHistoryAiSessionRecord = {
    taskId,
    projectId,
    threadKey:
      typeof input.threadKey === "string" && input.threadKey.trim().length > 0
        ? input.threadKey.trim()
        : (existing?.threadKey ?? null),
    writerAgent:
      typeof input.writerAgent === "string" &&
      input.writerAgent.trim().length > 0
        ? input.writerAgent.trim()
        : (existing?.writerAgent ?? null),
    status: input.status.trim() || existing?.status || "completed",
    promptSummary: scrubSummary(promptSummarySource),
    resultSummary: scrubSummary(resultSummarySource),
    promptBody,
    resultBody,
    createdAt:
      typeof input.createdAt === "string" && input.createdAt.trim().length > 0
        ? input.createdAt.trim()
        : (existing?.createdAt ?? now),
    completedAt:
      input.completedAt === undefined
        ? (existing?.completedAt ?? now)
        : input.completedAt === null
          ? null
          : input.completedAt.trim() || null,
    agentRunId,
    savedAt: now,
  };

  try {
    atomicWriteFile0600(filePath, `${JSON.stringify(record, null, 2)}\n`);
    return { ok: true, record };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "write_failed", projectId, taskId, error);
    return { ok: false, reason: "write_failed" };
  }
};
