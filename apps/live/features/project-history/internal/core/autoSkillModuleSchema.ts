import type { AutoSkillModuleDb } from "./autoSkillModuleDb";

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS module_cluster (
  id TEXT PRIMARY KEY, project_id TEXT NOT NULL, label TEXT NOT NULL,
  occurrences INTEGER NOT NULL DEFAULT 0,
  distinct_prompts INTEGER NOT NULL DEFAULT 0,
  state TEXT NOT NULL DEFAULT 'watching', skill_id TEXT,
  updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS module (
  id TEXT PRIMARY KEY, project_id TEXT NOT NULL, cluster_id TEXT NOT NULL,
  hash TEXT NOT NULL, canonical TEXT NOT NULL, verb TEXT NOT NULL,
  target TEXT NOT NULL, params_json TEXT NOT NULL, vector BLOB,
  first_seen_run TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE UNIQUE INDEX IF NOT EXISTS module_project_hash
  ON module (project_id, hash);
CREATE TABLE IF NOT EXISTS module_occurrence (
  module_id TEXT NOT NULL, cluster_id TEXT NOT NULL, run_id TEXT NOT NULL,
  prompt_id TEXT NOT NULL, position INTEGER NOT NULL,
  tokens_observed INTEGER,
  PRIMARY KEY (module_id, run_id, position));
CREATE INDEX IF NOT EXISTS module_occurrence_cluster
  ON module_occurrence (cluster_id);
`;

export const ensureAutoSkillModuleSchema = (db: AutoSkillModuleDb): void => {
  db.exec(SCHEMA_SQL);
};
