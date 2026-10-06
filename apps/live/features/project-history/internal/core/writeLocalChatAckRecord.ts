import fs from "node:fs";
import path from "node:path";

import { atomicWriteFile0600 } from "./atomicWriteFile0600";
import { buildLocalChatAckRecord } from "./buildLocalChatAckRecord";
import type { LocalChatAckRecord } from "./localChatAckRecord.type";
import {
  PROJECT_HISTORY_ACKS_DIR_NAME,
  PROJECT_HISTORY_DIR_NAME,
} from "./projectHistoryPaths.constant";
import { ensureProjectDataTree } from "./resolveProjectDataDir";

const isSafeId = (value: string): boolean =>
  value.length > 0 &&
  !value.includes("/") &&
  !value.includes("\\") &&
  !value.includes("..");

/**
 * Persists one per-device ack under `history/acks/<messageId>.json` (0600).
 * Local-only (not synced); B0 keeps the whole `history/` tree.
 * Idempotent by messageId when the same deviceId is already recorded.
 */
export const writeLocalChatAckRecord = (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly messageId: string;
  readonly nowIso?: string;
}): LocalChatAckRecord => {
  const messageId = input.messageId.trim();
  const deviceId = input.deviceId.trim();
  if (!isSafeId(messageId) || !isSafeId(deviceId)) {
    throw new Error("invalid_ack_ids");
  }
  const projectDataDir = ensureProjectDataTree(input.projectId);
  const filePath = path.join(
    projectDataDir,
    PROJECT_HISTORY_DIR_NAME,
    PROJECT_HISTORY_ACKS_DIR_NAME,
    `${messageId}.json`,
  );
  const nowIso = input.nowIso ?? new Date().toISOString();
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
      ) as LocalChatAckRecord;
      if (
        existing.messageId === messageId &&
        existing.deviceId === deviceId &&
        typeof existing.ackedAt === "string"
      ) {
        const updated: LocalChatAckRecord = {
          ...existing,
          lastSeenAt: nowIso,
        };
        atomicWriteFile0600(filePath, `${JSON.stringify(updated)}\n`);
        return updated;
      }
    } catch {
      // rewrite
    }
  }
  const record = buildLocalChatAckRecord({
    deviceId,
    messageId,
    ackedAt: nowIso,
    lastSeenAt: nowIso,
  });
  atomicWriteFile0600(filePath, `${JSON.stringify(record)}\n`);
  return record;
};
