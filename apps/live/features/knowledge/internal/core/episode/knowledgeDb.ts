import fs from "node:fs";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { loadNodeSqlite } from "../../../../token-saver/internal/core/loadNodeSqlite";
import { resolveProfileScopedPath } from "../../../../token-saver/internal/core/resolveProfileScopedPath";

export const KNOWLEDGE_DB_FILE_NAME = "knowledge.db";
export const KNOWLEDGE_SCHEMA_VERSION = 1;
const KNOWLEDGE_DB_BUSY_TIMEOUT_MS = 3_000;

export type KnowledgeDatabase = DatabaseSync;

export const KNOWLEDGE_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS knowledge_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  project_key TEXT NOT NULL,
  kind TEXT NOT NULL,
  request TEXT NOT NULL,
  takeaway TEXT NOT NULL,
  files_json TEXT NOT NULL DEFAULT '[]',
  commit_shas_json TEXT NOT NULL DEFAULT '[]',
  branch TEXT,
  outcome TEXT NOT NULL,
  supersedes TEXT,
  fingerprint TEXT,
  content_hash TEXT NOT NULL,
  occurrences INTEGER NOT NULL DEFAULT 1,
  hits INTEGER NOT NULL DEFAULT 0,
  useful_count INTEGER NOT NULL DEFAULT 0,
  ineffective_count INTEGER NOT NULL DEFAULT 0,
  cost_tokens INTEGER NOT NULL DEFAULT 0,
  source_run_id TEXT,
  embed_model TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS episodes_content_hash
  ON episodes (project_key, content_hash);
CREATE INDEX IF NOT EXISTS episodes_project
  ON episodes (project_key, kind, outcome);
CREATE INDEX IF NOT EXISTS episodes_fingerprint
  ON episodes (project_key, fingerprint);
CREATE TABLE IF NOT EXISTS episode_vectors (
  episode_id TEXT PRIMARY KEY REFERENCES episodes(id) ON DELETE CASCADE,
  vector BLOB NOT NULL,
  dim INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS knowledge_events (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL UNIQUE,
  project_key TEXT NOT NULL,
  ts TEXT NOT NULL,
  task_class TEXT NOT NULL,
  mode TEXT NOT NULL,
  holdout INTEGER NOT NULL DEFAULT 0,
  cards_injected INTEGER NOT NULL DEFAULT 0,
  injected_tokens INTEGER NOT NULL DEFAULT 0,
  check_latency_ms INTEGER NOT NULL DEFAULT 0,
  degraded TEXT,
  outcome TEXT,
  repeated_mistake INTEGER NOT NULL DEFAULT 0,
  created_mistake INTEGER NOT NULL DEFAULT 0,
  correction_turns INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS knowledge_events_project_ts
  ON knowledge_events (project_key, ts);
CREATE INDEX IF NOT EXISTS knowledge_events_ts ON knowledge_events (ts);
CREATE TABLE IF NOT EXISTS injections (
  run_id TEXT NOT NULL,
  episode_id TEXT NOT NULL,
  score REAL NOT NULL,
  PRIMARY KEY (run_id, episode_id)
);
CREATE TABLE IF NOT EXISTS mistake_hits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  episode_id TEXT NOT NULL,
  run_id TEXT NOT NULL,
  prevented INTEGER NOT NULL,
  ts TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS mistake_hits_episode ON mistake_hits (episode_id);
CREATE TABLE IF NOT EXISTS knowledge_projects (
  project_key TEXT PRIMARY KEY,
  folder_path TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
`;

export const resolveKnowledgeDbPath = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): string => resolveProfileScopedPath(layout, KNOWLEDGE_DB_FILE_NAME);

/** Open (or create) a knowledge DB and apply the schema. Throws if SQLite is missing. */
export const openKnowledgeDb = (dbPath: string): KnowledgeDatabase => {
  const availability = loadNodeSqlite();
  if (!availability.ok) {
    throw new Error(`Knowledge DB unavailable: ${availability.reason}`);
  }
  if (dbPath !== ":memory:") {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  const db = new availability.sqlite.DatabaseSync(dbPath);
  db.exec(`PRAGMA busy_timeout = ${KNOWLEDGE_DB_BUSY_TIMEOUT_MS}`);
  db.exec("PRAGMA foreign_keys = ON");
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA synchronous = NORMAL");
  db.exec(KNOWLEDGE_SCHEMA_SQL);
  db.prepare(
    `INSERT INTO knowledge_meta (key, value) VALUES ('schema_version', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
  ).run(String(KNOWLEDGE_SCHEMA_VERSION));
  return db;
};

const OPEN_RETRY_MS = 60_000;
const openDatabases = new Map<string, KnowledgeDatabase | null>();
const failedOpenAt = new Map<string, number>();

/** Cached per-process handle; null when SQLite is unavailable or the file is corrupt. */
export const getKnowledgeDb = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
): KnowledgeDatabase | null => {
  const dbPath = resolveKnowledgeDbPath(layout);
  const cached = openDatabases.get(dbPath);
  if (cached !== undefined && cached !== null) {
    return cached;
  }
  const failedAt = failedOpenAt.get(dbPath);
  if (failedAt !== undefined && Date.now() - failedAt < OPEN_RETRY_MS) {
    return null;
  }
  try {
    const db = openKnowledgeDb(dbPath);
    openDatabases.set(dbPath, db);
    failedOpenAt.delete(dbPath);
    return db;
  } catch {
    failedOpenAt.set(dbPath, Date.now());
    return null;
  }
};

export const closeKnowledgeDbsForTests = (): void => {
  for (const db of openDatabases.values()) {
    db?.close();
  }
  openDatabases.clear();
  failedOpenAt.clear();
};
