/** Local chat index (S5) — rebuildable SQLite under project-data/<id>/index/. */
export const HISTORY_STORE_SCHEMA_VERSION = 1;
export const HISTORY_STORE_BUSY_TIMEOUT_MS = 3000;
export const HISTORY_STORE_KIND_MESSAGE = "message";
export const HISTORY_STORE_KIND_SUMMARY = "summary";
export type HistoryStoreRecordKind =
  | typeof HISTORY_STORE_KIND_MESSAGE
  | typeof HISTORY_STORE_KIND_SUMMARY;
