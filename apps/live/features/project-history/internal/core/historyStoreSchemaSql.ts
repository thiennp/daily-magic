import { HISTORY_STORE_SCHEMA_VERSION } from "./historyStore.constants";

export const HISTORY_STORE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS history_store_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  message_id TEXT NOT NULL PRIMARY KEY,
  project_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  thread_key TEXT,
  created_at TEXT NOT NULL,
  saved_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS records_project_thread_created_idx
  ON records (project_id, thread_key, created_at);

CREATE INDEX IF NOT EXISTS records_project_created_idx
  ON records (project_id, created_at);
`;

export const historyStoreSchemaVersionValue = (): string =>
  String(HISTORY_STORE_SCHEMA_VERSION);
