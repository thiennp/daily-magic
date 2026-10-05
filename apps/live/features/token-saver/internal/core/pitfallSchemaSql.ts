import { PITFALL_SCHEMA_VERSION } from "./pitfall.constants";

/**
 * Pitfall content lives in `pitfalls`; hit counters live only in
 * `pitfall_hits`, keyed per project + pitfall id. Pitfall/seed rows never
 * carry counters, so upserts and re-seeds cannot clobber them.
 */
export const PITFALL_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS pitfall_meta (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pitfalls (
  project_id TEXT NOT NULL DEFAULT '',
  id TEXT NOT NULL,
  symptom TEXT NOT NULL,
  cause TEXT NOT NULL,
  avoidance TEXT NOT NULL,
  check_kind TEXT NOT NULL,
  check_value TEXT NOT NULL,
  keywords_json TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  source TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warn',
  PRIMARY KEY (project_id, id)
);

CREATE INDEX IF NOT EXISTS pitfalls_project_source_idx
  ON pitfalls (project_id, source);

CREATE TABLE IF NOT EXISTS pitfall_hits (
  project_id TEXT NOT NULL DEFAULT '',
  pitfall_id TEXT NOT NULL,
  hit_count INTEGER NOT NULL DEFAULT 0,
  last_seen_at TEXT,
  PRIMARY KEY (project_id, pitfall_id)
);
`;

export const pitfallSchemaVersionValue = (): string =>
  String(PITFALL_SCHEMA_VERSION);
