import fs from "node:fs";
import path from "node:path";

import type { ProjectHistoryAiSessionRecord } from "./projectHistoryAiSessionRecord.type";
import { PROJECT_HISTORY_TASKS_DIR_NAME } from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null;

const parseSessionFile = (
  filePath: string,
): ProjectHistoryAiSessionRecord | null => {
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!isRecord(parsed)) {
      return null;
    }
    const taskId = readString(parsed.taskId);
    const projectId = readString(parsed.projectId);
    const status = readString(parsed.status);
    const createdAt = readString(parsed.createdAt);
    const savedAt = readString(parsed.savedAt);
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
        : readString(threadRaw);
    return {
      taskId,
      projectId,
      threadKey,
      writerAgent: readString(parsed.writerAgent),
      status,
      promptSummary:
        typeof parsed.promptSummary === "string" ? parsed.promptSummary : "",
      resultSummary:
        typeof parsed.resultSummary === "string" ? parsed.resultSummary : "",
      createdAt,
      completedAt:
        parsed.completedAt === null || parsed.completedAt === undefined
          ? null
          : readString(parsed.completedAt),
      agentRunId: readString(parsed.agentRunId),
      savedAt,
    };
  } catch {
    return null;
  }
};

/** All AI session records for a project (unsorted). Missing dir → []. */
export const listProjectHistoryAiSessions = (
  projectId: string,
): readonly ProjectHistoryAiSessionRecord[] => {
  let tasksDir: string;
  try {
    tasksDir = path.join(
      resolveProjectDataDir(projectId),
      PROJECT_HISTORY_TASKS_DIR_NAME,
    );
  } catch {
    return [];
  }
  if (!fs.existsSync(tasksDir)) {
    return [];
  }
  const entries = fs.readdirSync(tasksDir, { withFileTypes: true });
  const sessions: ProjectHistoryAiSessionRecord[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      continue;
    }
    const record = parseSessionFile(path.join(tasksDir, entry.name));
    if (record !== null) {
      sessions.push(record);
    }
  }
  return sessions;
};
