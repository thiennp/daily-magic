import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";

import { requireNodeSqlite } from "./loadNodeSqlite";
import {
  PITFALL_DB_BUSY_TIMEOUT_MS,
  PITFALL_SCHEMA_VERSION,
} from "./pitfall.constants";
import {
  PITFALL_SCHEMA_SQL,
  pitfallSchemaVersionValue,
} from "./pitfallSchemaSql";

export type PitfallDatabase = DatabaseSync;

const readSchemaVersion = (db: DatabaseSync): number => {
  const row = db
    .prepare("SELECT value FROM pitfall_meta WHERE key = 'schema_version'")
    .get() as unknown as { value: string } | undefined;
  if (row === undefined) {
    return 0;
  }
  const parsed = Number.parseInt(row.value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

const writeSchemaVersion = (db: DatabaseSync, version: number): void => {
  db.prepare(
    `INSERT INTO pitfall_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(String(version));
};

/** Open (or create) the pitfall SQLite DB and apply schema migrations. */
export const openPitfallDb = (dbPath: string): PitfallDatabase => {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const { DatabaseSync: Database } = requireNodeSqlite();
  const db = new Database(dbPath);
  // Concurrent AWL processes (HTTP + stdio MCP) may share the file: wait on locks.
  db.exec(`PRAGMA busy_timeout = ${PITFALL_DB_BUSY_TIMEOUT_MS}`);
  db.exec(PITFALL_SCHEMA_SQL);
  const current = readSchemaVersion(db);
  if (current < PITFALL_SCHEMA_VERSION) {
    writeSchemaVersion(db, PITFALL_SCHEMA_VERSION);
  }
  return db;
};

export const closePitfallDb = (db: PitfallDatabase): void => {
  db.close();
};

export { pitfallSchemaVersionValue };
