import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";

import { loadNodeSqlite } from "@agent-witch/live-token-saver";

import {
  HISTORY_STORE_BUSY_TIMEOUT_MS,
  HISTORY_STORE_SCHEMA_VERSION,
} from "./historyStore.constants";
import {
  HISTORY_STORE_SCHEMA_SQL,
  historyStoreSchemaVersionValue,
} from "./historyStoreSchemaSql";
import { resolveHistoryStoreDbPath } from "./resolveHistoryStoreDbPath";

export type HistoryStoreDatabase = DatabaseSync;

export type OpenHistoryStoreDbResult =
  | { readonly ok: true; readonly db: HistoryStoreDatabase }
  | { readonly ok: false; readonly reason: string };

const readSchemaVersion = (db: DatabaseSync): number => {
  const row = db
    .prepare(
      "SELECT value FROM history_store_meta WHERE key = 'schema_version'",
    )
    .get() as unknown as { value: string } | undefined;
  if (row === undefined) {
    return 0;
  }
  const parsed = Number.parseInt(row.value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

const writeSchemaVersion = (db: DatabaseSync, version: number): void => {
  db.prepare(
    `INSERT INTO history_store_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(String(version));
};

/**
 * Open (or create) the per-project chat index DB.
 * Degrades when node:sqlite is unavailable (Node < 22.13).
 */
export const openHistoryStoreDb = (
  projectId: string,
): OpenHistoryStoreDbResult => {
  const availability = loadNodeSqlite();
  if (!availability.ok) {
    return { ok: false, reason: availability.reason };
  }
  const dbPath = resolveHistoryStoreDbPath(projectId);
  fs.mkdirSync(path.dirname(dbPath), { recursive: true, mode: 0o700 });
  const db = new availability.sqlite.DatabaseSync(dbPath);
  db.exec(`PRAGMA busy_timeout = ${HISTORY_STORE_BUSY_TIMEOUT_MS}`);
  db.exec(HISTORY_STORE_SCHEMA_SQL);
  const current = readSchemaVersion(db);
  if (current < HISTORY_STORE_SCHEMA_VERSION) {
    writeSchemaVersion(db, HISTORY_STORE_SCHEMA_VERSION);
  }
  return { ok: true, db };
};

export const closeHistoryStoreDb = (db: HistoryStoreDatabase): void => {
  db.close();
};

export { historyStoreSchemaVersionValue };
