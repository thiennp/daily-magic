import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { ingestHistoryMessageIntoIndex } from "./ingestHistoryMessageIntoIndex";
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

const LOG_PREFIX = "[project-history-write]";

const bestEffortIngest = (record: ProjectHistoryMessageRecord): void => {
  try {
    ingestHistoryMessageIntoIndex({ record });
  } catch (error: unknown) {
    console.error(
      LOG_PREFIX,
      "index_ingest_failed",
      record.projectId,
      record.messageId,
      error,
    );
  }
};

/**
 * Stores one history message under `history/<messageId>.json` atomically,
 * idempotent by messageId, mode 0600.
 * After a durable write (or idempotent hit), best-effort index ingest —
 * never fails the durable write if the index is unavailable.
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
        bestEffortIngest(existing);
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
  bestEffortIngest(record);
  return record;
};
