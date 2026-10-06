import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { buildProjectHistoryMessageRecordV2 } from "./buildProjectHistoryMessageRecordV2";
import { ingestHistoryMessageIntoIndex } from "./ingestHistoryMessageIntoIndex";
import { PROJECT_HISTORY_DIR_NAME } from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

/**
 * Durable history message. v1 = required fields only. v2 writers also set
 * `version`, `threadKey`, `createdAt`, `senderLabel` (Mac peek prefers those).
 */
export type ProjectHistoryMessageRecord = {
  readonly messageId: string;
  readonly projectId: string;
  readonly message: Readonly<Record<string, unknown>>;
  readonly savedAt: string;
  readonly version?: number;
  readonly threadKey?: string | null;
  readonly createdAt?: string;
  readonly senderLabel?: string | null;
};

const LOG_PREFIX = "[project-history-write]";

const isSafeMessageId = (messageId: string): boolean =>
  messageId.length > 0 &&
  !messageId.includes("/") &&
  !messageId.includes("\\") &&
  !messageId.includes("..");

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
 * idempotent by messageId, mode 0600. New writes are record v2.
 * After a durable write (or idempotent hit), best-effort index ingest —
 * never fails the durable write if the index is unavailable.
 */
export const writeProjectHistoryMessage = (input: {
  readonly projectId: string;
  readonly messageId: string;
  readonly message: Readonly<Record<string, unknown>>;
  readonly botIds?: ReadonlySet<string>;
  readonly wholeMessageIds?: ReadonlySet<string>;
}): ProjectHistoryMessageRecord => {
  const messageId = input.messageId.trim();
  if (!isSafeMessageId(messageId)) {
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
  const record = buildProjectHistoryMessageRecordV2({
    messageId,
    projectId: input.projectId,
    message: input.message,
    savedAt: new Date().toISOString(),
    botIds: input.botIds,
    wholeMessageIds: input.wholeMessageIds,
  });
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  bestEffortIngest(record);
  return record;
};
