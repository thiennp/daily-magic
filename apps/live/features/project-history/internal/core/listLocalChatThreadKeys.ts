import type { SQLOutputValue } from "node:sqlite";
import { listLocalChatIndexPage } from "./listLocalChatIndexPage";
import { loadNodeSqlite } from "@agent-witch/live-token-saver";
import {
  closeHistoryStoreDb,
  openHistoryStoreDb,
} from "./openHistoryStoreDb";
import { HISTORY_STORE_KIND_MESSAGE } from "./historyStore.constants";

export type ListLocalChatThreadKeysResult = {
  readonly available: boolean;
  readonly threadKeys: readonly string[];
  readonly reason?: string;
};

/**
 * Distinct non-null threadKeys for a project (S13 chats list).
 * Empty when sqlite unavailable and no threadKey on scanned files.
 */
export const listLocalChatThreadKeys = (input: {
  readonly projectId: string;
}): ListLocalChatThreadKeysResult => {
  const sqlite = loadNodeSqlite();
  if (sqlite.ok) {
    const opened = openHistoryStoreDb(input.projectId);
    if (opened.ok) {
      try {
        const rawRows = opened.db
          .prepare(
            `SELECT DISTINCT thread_key AS threadKey
             FROM records
             WHERE project_id = ? AND kind = ? AND thread_key IS NOT NULL
             ORDER BY thread_key ASC`,
          )
          .all(input.projectId, HISTORY_STORE_KIND_MESSAGE);
        const threadKeys: string[] = [];
        for (const raw of rawRows) {
          const value: SQLOutputValue | undefined = raw.threadKey;
          if (typeof value === "string" && value.length > 0) {
            threadKeys.push(value);
          }
        }
        return {
          available: true,
          threadKeys,
        };
      } catch {
        // fall through to file scan
      } finally {
        closeHistoryStoreDb(opened.db);
      }
    } else {
      return {
        available: false,
        threadKeys: [],
        reason: opened.reason,
      };
    }
  }

  const page = listLocalChatIndexPage({
    projectId: input.projectId,
    limit: 200,
  });
  const keys = [
    ...new Set(
      page.rows
        .map((row) => row.threadKey)
        .filter((key): key is string => typeof key === "string" && key.length > 0),
    ),
  ].sort();
  return {
    available: page.available,
    threadKeys: keys,
    reason: sqlite.ok ? undefined : sqlite.reason,
  };
};
