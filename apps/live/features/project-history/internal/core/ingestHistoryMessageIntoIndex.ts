import {
  HISTORY_STORE_KIND_MESSAGE,
  type HistoryStoreRecordKind,
} from "./historyStore.constants";
import { extractHistoryIndexFields } from "./extractHistoryIndexFields";
import {
  closeHistoryStoreDb,
  openHistoryStoreDb,
} from "./openHistoryStoreDb";
import type { ProjectHistoryIndexableRecord } from "./projectHistoryIndexRecord.type";

export type IngestHistoryMessageIntoIndexResult =
  | { readonly ok: true; readonly threadKey: string | null; readonly createdAt: string }
  | { readonly ok: false; readonly reason: string };

const LOG_PREFIX = "[project-history-index]";

/**
 * Upsert one history message into the rebuildable chat index.
 * Never throws for sqlite-unavailable / write failures — callers treat as best-effort.
 */
export const ingestHistoryMessageIntoIndex = (input: {
  readonly record: ProjectHistoryIndexableRecord;
  readonly kind?: HistoryStoreRecordKind;
}): IngestHistoryMessageIntoIndexResult => {
  const opened = openHistoryStoreDb(input.record.projectId);
  if (!opened.ok) {
    return { ok: false, reason: opened.reason };
  }
  const { threadKey, createdAt } = extractHistoryIndexFields(input.record);
  const kind = input.kind ?? HISTORY_STORE_KIND_MESSAGE;
  try {
    opened.db
      .prepare(
        `INSERT INTO records (message_id, project_id, kind, thread_key, created_at, saved_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(message_id) DO UPDATE SET
           project_id = excluded.project_id,
           kind = excluded.kind,
           thread_key = excluded.thread_key,
           created_at = excluded.created_at,
           saved_at = excluded.saved_at`,
      )
      .run(
        input.record.messageId,
        input.record.projectId,
        kind,
        threadKey,
        createdAt,
        input.record.savedAt,
      );
    return { ok: true, threadKey, createdAt };
  } catch (error: unknown) {
    console.error(
      LOG_PREFIX,
      "ingest_failed",
      input.record.projectId,
      input.record.messageId,
      error,
    );
    return { ok: false, reason: "ingest_failed" };
  } finally {
    closeHistoryStoreDb(opened.db);
  }
};
