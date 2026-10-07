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

export type WriteProjectHistoryAiSessionInput = {
  readonly projectId: string;
  readonly taskId: string;
  readonly status: string;
  readonly promptSummary: string;
  readonly resultSummary: string;
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
 * Persist a scrubbed AI session when History is confirmed ON locally and a
 * projectId is known. No-op (ok:false) when History is off or unknown.
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
  const record: ProjectHistoryAiSessionRecord = {
    taskId,
    projectId,
    threadKey:
      typeof input.threadKey === "string" && input.threadKey.trim().length > 0
        ? input.threadKey.trim()
        : null,
    writerAgent:
      typeof input.writerAgent === "string" && input.writerAgent.trim().length > 0
        ? input.writerAgent.trim()
        : null,
    status: input.status.trim() || "completed",
    promptSummary: scrubSummary(input.promptSummary),
    resultSummary: scrubSummary(input.resultSummary),
    createdAt:
      typeof input.createdAt === "string" && input.createdAt.trim().length > 0
        ? input.createdAt.trim()
        : now,
    completedAt:
      input.completedAt === undefined
        ? now
        : input.completedAt === null
          ? null
          : input.completedAt.trim() || null,
    agentRunId:
      typeof input.agentRunId === "string" && input.agentRunId.trim().length > 0
        ? input.agentRunId.trim()
        : taskId,
    savedAt: now,
  };

  try {
    const root = ensureProjectDataTree(projectId);
    // Prefer tasks/<agentRunId>.json so the path matches the timeline id.
    const fileBase =
      record.agentRunId !== null && record.agentRunId.length > 0
        ? record.agentRunId
        : taskId;
    if (!isSafeTaskId(fileBase)) {
      return { ok: false, reason: "invalid_task_id" };
    }
    const filePath = path.join(
      root,
      PROJECT_HISTORY_TASKS_DIR_NAME,
      `${fileBase}.json`,
    );
    atomicWriteFile0600(filePath, `${JSON.stringify(record, null, 2)}\n`);
    return { ok: true, record };
  } catch (error: unknown) {
    console.error(LOG_PREFIX, "write_failed", projectId, taskId, error);
    return { ok: false, reason: "write_failed" };
  }
};
