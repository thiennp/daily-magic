/**
 * Browser chat store (IndexedDB) — thin re-exports of project-sync IDB.
 * Soft tip names kept; schema owned by `projectSyncIdb` (v2 + clear path).
 */
export {
  PROJECT_SYNC_IDB_DB_NAME as MESSENGER_CHAT_DB_NAME,
  PROJECT_SYNC_IDB_DB_VERSION as MESSENGER_CHAT_DB_VERSION,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS as MESSENGER_CHAT_STORE,
  PROJECT_SYNC_TABLE_KEPT_RECIPIENTS as MESSENGER_KEPT_RECIPIENT_STORE,
  PROJECT_SYNC_PROJECT_INDEX as MESSENGER_CHAT_PROJECT_INDEX,
} from "@/features/projects/sync/public-api/types";

/** Trim lock (Lead Q2): a message may leave the browser only when it is
 * BOTH older than this AND outside the newest MAX_MESSAGES, AND confirmed
 * stored on a computer. Projects with no owner computer never trim. */
export const MESSENGER_CHAT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
export const MESSENGER_CHAT_MAX_MESSAGES = 1000;
