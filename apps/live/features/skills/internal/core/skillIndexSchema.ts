import type { SkillIndexDb } from "./skillIndex.types";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS skill_index (
  skill_id TEXT NOT NULL, project_id TEXT NOT NULL, name TEXT NOT NULL,
  description TEXT NOT NULL, when_to_use TEXT NOT NULL,
  keywords TEXT NOT NULL, embedding BLOB, version INTEGER NOT NULL,
  has_scripts INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL,
  PRIMARY KEY (project_id, skill_id));
CREATE TABLE IF NOT EXISTS skill_call (
  id TEXT PRIMARY KEY, skill_id TEXT NOT NULL, project_id TEXT NOT NULL,
  run_id TEXT, chosen_by TEXT NOT NULL, tool TEXT NOT NULL,
  ok INTEGER NOT NULL, duration_ms INTEGER NOT NULL, created_at TEXT NOT NULL,
  tokens_actual INTEGER, baseline_tokens INTEGER, saved_tokens INTEGER,
  holdout INTEGER NOT NULL DEFAULT 0);
CREATE INDEX IF NOT EXISTS skill_call_project
  ON skill_call (project_id, created_at);
CREATE TABLE IF NOT EXISTS skill_find_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT, project_id TEXT NOT NULL,
  query TEXT NOT NULL, returned_ids TEXT NOT NULL, chosen_id TEXT,
  run_id TEXT, created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS skill_find_log_project
  ON skill_find_log (project_id, created_at);
CREATE TABLE IF NOT EXISTS skill_script_approval (
  project_id TEXT NOT NULL, skill_id TEXT NOT NULL, script TEXT NOT NULL,
  sha256 TEXT NOT NULL, status TEXT NOT NULL, decided_at TEXT NOT NULL,
  PRIMARY KEY (project_id, skill_id, script, sha256));
CREATE TABLE IF NOT EXISTS skill_baseline (
  project_id TEXT NOT NULL, skill_id TEXT NOT NULL,
  samples TEXT NOT NULL DEFAULT '[]', baseline INTEGER,
  estimate INTEGER NOT NULL DEFAULT 1, seeded INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (project_id, skill_id));
`;

/** Idempotent bootstrap; safe to call on every open. */
export const ensureSkillIndexSchema = (db: SkillIndexDb): void => {
  db.exec(SCHEMA_SQL);
};
