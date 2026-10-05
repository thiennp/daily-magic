import fs from "node:fs";
import path from "node:path";

import { PROJECT_HISTORY_DIR_NAME } from "./projectHistoryPaths.constant";
import { readProjectHistoryMessage } from "./readProjectHistoryMessage";
import { resolveProjectDataDir } from "./resolveProjectDataDir";
import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";

/**
 * Lists durable history messages newest-last (savedAt ascending, then messageId).
 * Skips `state.json` and unreadable files.
 */
export const listProjectHistoryMessages = (
  projectId: string,
): readonly ProjectHistoryMessageRecord[] => {
  const historyDir = path.join(
    resolveProjectDataDir(projectId),
    PROJECT_HISTORY_DIR_NAME,
  );
  if (!fs.existsSync(historyDir)) {
    return [];
  }
  const ids = fs
    .readdirSync(historyDir)
    .filter((name) => name.endsWith(".json") && name !== "state.json")
    .map((name) => name.slice(0, -".json".length));
  const records: ProjectHistoryMessageRecord[] = [];
  for (const messageId of ids) {
    const record = readProjectHistoryMessage({ projectId, messageId });
    if (record !== null) {
      records.push(record);
    }
  }
  return records.sort((a, b) => {
    const aMs = Date.parse(a.savedAt);
    const bMs = Date.parse(b.savedAt);
    if (aMs !== bMs) {
      return aMs - bMs;
    }
    return a.messageId.localeCompare(b.messageId);
  });
};
