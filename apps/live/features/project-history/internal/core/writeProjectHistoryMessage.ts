import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import {
  PROJECT_HISTORY_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

export type ProjectHistoryMessageRecord = {
  readonly messageId: string;
  readonly projectId: string;
  readonly message: Readonly<Record<string, unknown>>;
  readonly savedAt: string;
};

/**
 * Stores one history message under `history/<messageId>.json` atomically,
 * idempotent by messageId, mode 0600.
 */
export const writeProjectHistoryMessage = (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly message: Readonly<Record<string, unknown>>;
}): ProjectHistoryMessageRecord => {
  const messageId = input.messageId.trim();
  if (messageId.length === 0 || messageId.includes("/") || messageId.includes("\\") || messageId.includes("..")) {
    throw new Error("invalid_message_id");
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_DIR_NAME,
    `${messageId}.json`,
  );
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
      ) as ProjectHistoryMessageRecord;
      if (existing.messageId === messageId) {
        return existing;
      }
    } catch {
      // rewrite
    }
  }
  const record: ProjectHistoryMessageRecord = {
    messageId,
    projectId: input.projectId,
    message: input.message,
    savedAt: new Date().toISOString(),
  };
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
