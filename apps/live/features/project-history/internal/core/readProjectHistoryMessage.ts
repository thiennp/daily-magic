import fs from "node:fs";
import path from "node:path";

import type { ProjectHistoryMessageRecord } from "./writeProjectHistoryMessage";
import { PROJECT_HISTORY_DIR_NAME } from "./projectHistoryPaths.constant";
import { resolveProjectDataDir } from "./resolveProjectDataDir";

const isRecord = (value: unknown): value is ProjectHistoryMessageRecord => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row.messageId === "string" &&
    typeof row.projectId === "string" &&
    typeof row.savedAt === "string" &&
    typeof row.message === "object" &&
    row.message !== null &&
    !Array.isArray(row.message)
  );
};

/**
 * Reads one durable history message from `history/<messageId>.json`.
 * Returns null when missing or corrupt (never throws).
 */
export const readProjectHistoryMessage = (input: {
  readonly projectId: string;
  readonly messageId: string;
}): ProjectHistoryMessageRecord | null => {
  const messageId = input.messageId.trim();
  if (
    messageId.length === 0 ||
    messageId.includes("/") ||
    messageId.includes("\\") ||
    messageId.includes("..")
  ) {
    return null;
  }
  const filePath = path.join(
    resolveProjectDataDir(input.projectId),
    PROJECT_HISTORY_DIR_NAME,
    `${messageId}.json`,
  );
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
