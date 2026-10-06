import type { SQLInputValue, SQLOutputValue } from "node:sqlite";
import { HISTORY_STORE_KIND_MESSAGE } from "./historyStore.constants";
import { extractHistoryIndexFields } from "./extractHistoryIndexFields";
import { listProjectHistoryMessages } from "./listProjectHistoryMessages";
import {
  closeHistoryStoreDb,
  openHistoryStoreDb,
} from "./openHistoryStoreDb";
import type { ProjectHistoryIndexRow } from "./projectHistoryIndexRecord.type";
import { loadNodeSqlite } from "@agent-witch/live-token-saver";

export type ListLocalChatIndexPageInput = {
  readonly projectId: string;
  readonly threadKey?: string | null;
  readonly beforeCreatedAt?: string | null;
  readonly beforeMessageId?: string | null;
  readonly limit?: number;
};

export type ListLocalChatIndexPageResult = {
  readonly available: boolean;
  readonly rows: readonly ProjectHistoryIndexRow[];
  readonly reason?: string;
};

const readSqlText = (
  row: Record<string, SQLOutputValue>,
  key: string,
): string | null => {
  const value = row[key];
  return typeof value === "string" ? value : null;
};

const mapChatIndexSqlRow = (
  row: Record<string, SQLOutputValue>,
): ProjectHistoryIndexRow | null => {
  const messageId = readSqlText(row, "messageId");
  const projectId = readSqlText(row, "projectId");
  const kindRaw = readSqlText(row, "kind");
  const createdAt = readSqlText(row, "createdAt");
  const savedAt = readSqlText(row, "savedAt");
  if (
    messageId === null ||
    projectId === null ||
    kindRaw === null ||
    createdAt === null ||
    savedAt === null
  ) {
    return null;
  }
  const threadKeyValue = row.threadKey;
  const threadKey =
    threadKeyValue === null || threadKeyValue === undefined
      ? null
      : typeof threadKeyValue === "string"
        ? threadKeyValue
        : null;
  return {
    messageId,
    projectId,
    kind:
      kindRaw === "summary"
        ? "summary"
        : HISTORY_STORE_KIND_MESSAGE,
    threadKey,
    createdAt,
    savedAt,
  };
};

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

const clampLimit = (limit: number | undefined): number => {
  if (typeof limit !== "number" || !Number.isFinite(limit) || limit <= 0) {
    return DEFAULT_LIMIT;
  }
  return Math.min(Math.floor(limit), MAX_LIMIT);
};

const compareNewestFirst = (
  a: { readonly createdAt: string; readonly messageId: string },
  b: { readonly createdAt: string; readonly messageId: string },
): number => {
  const aMs = Date.parse(a.createdAt);
  const bMs = Date.parse(b.createdAt);
  if (aMs !== bMs) {
    return bMs - aMs;
  }
  return b.messageId.localeCompare(a.messageId);
};

const isBeforeCursor = (
  row: { readonly createdAt: string; readonly messageId: string },
  beforeCreatedAt: string | null | undefined,
  beforeMessageId: string | null | undefined,
): boolean => {
  if (beforeCreatedAt === undefined || beforeCreatedAt === null || beforeCreatedAt === "") {
    return true;
  }
  const rowMs = Date.parse(row.createdAt);
  const beforeMs = Date.parse(beforeCreatedAt);
  if (rowMs < beforeMs) {
    return true;
  }
  if (rowMs > beforeMs) {
    return false;
  }
  if (
    beforeMessageId === undefined ||
    beforeMessageId === null ||
    beforeMessageId === ""
  ) {
    return true;
  }
  return row.messageId.localeCompare(beforeMessageId) < 0;
};

const listFromFiles = (
  input: ListLocalChatIndexPageInput,
  limit: number,
): ListLocalChatIndexPageResult => {
  const threadFilter =
    input.threadKey === undefined || input.threadKey === null
      ? null
      : input.threadKey;
  const rows = listProjectHistoryMessages(input.projectId)
    .map((record): ProjectHistoryIndexRow => {
      const fields = extractHistoryIndexFields(record);
      return {
        messageId: record.messageId,
        projectId: record.projectId,
        kind: HISTORY_STORE_KIND_MESSAGE,
        threadKey: fields.threadKey,
        createdAt: fields.createdAt,
        savedAt: record.savedAt,
      };
    })
    .filter((row) =>
      threadFilter === null ? true : row.threadKey === threadFilter,
    )
    .filter((row) =>
      isBeforeCursor(row, input.beforeCreatedAt, input.beforeMessageId),
    )
    .sort(compareNewestFirst)
    .slice(0, limit);
  return { available: true, rows };
};

/**
 * Newest-first page from the chat index.
 * Falls back to scanning history files when sqlite is unavailable.
 */
export const listLocalChatIndexPage = (
  input: ListLocalChatIndexPageInput,
): ListLocalChatIndexPageResult => {
  const limit = clampLimit(input.limit);
  const sqlite = loadNodeSqlite();
  if (!sqlite.ok) {
    return listFromFiles(input, limit);
  }

  const opened = openHistoryStoreDb(input.projectId);
  if (!opened.ok) {
    return {
      ...listFromFiles(input, limit),
      reason: opened.reason,
    };
  }

  try {
    const params: SQLInputValue[] = [input.projectId, HISTORY_STORE_KIND_MESSAGE];
    let sql =
      `SELECT message_id AS messageId, project_id AS projectId, kind,
              thread_key AS threadKey, created_at AS createdAt, saved_at AS savedAt
       FROM records
       WHERE project_id = ? AND kind = ?`;
    if (input.threadKey !== undefined && input.threadKey !== null) {
      sql += " AND thread_key = ?";
      params.push(input.threadKey);
    }
    if (
      input.beforeCreatedAt !== undefined &&
      input.beforeCreatedAt !== null &&
      input.beforeCreatedAt !== ""
    ) {
      if (
        input.beforeMessageId !== undefined &&
        input.beforeMessageId !== null &&
        input.beforeMessageId !== ""
      ) {
        sql +=
          " AND (created_at < ? OR (created_at = ? AND message_id < ?))";
        params.push(
          input.beforeCreatedAt,
          input.beforeCreatedAt,
          input.beforeMessageId,
        );
      } else {
        sql += " AND created_at < ?";
        params.push(input.beforeCreatedAt);
      }
    }
    sql += " ORDER BY created_at DESC, message_id DESC LIMIT ?";
    params.push(limit);

    const rawRows = opened.db.prepare(sql).all(...params);
    const rows: ProjectHistoryIndexRow[] = [];
    for (const raw of rawRows) {
      const mapped = mapChatIndexSqlRow(raw);
      if (mapped !== null) {
        rows.push(mapped);
      }
    }
    return { available: true, rows };
  } catch {
    return listFromFiles(input, limit);
  } finally {
    closeHistoryStoreDb(opened.db);
  }
};
