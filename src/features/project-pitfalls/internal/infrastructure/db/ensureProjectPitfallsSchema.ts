import { moveAgentWitchProjectPitfalls } from "@/features/project-pitfalls/internal/infrastructure/db/moveAgentWitchProjectPitfalls";
import { syncGlobalProjectPitfallSeeds } from "@/features/project-pitfalls/internal/infrastructure/db/syncGlobalProjectPitfallSeeds";
import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

const createTables = async (): Promise<void> => {
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS project_pitfalls (
    row_id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT REFERENCES user_projects(id) ON DELETE CASCADE,
    pitfall_id TEXT NOT NULL CHECK (pitfall_id ~ '^[a-z0-9][a-z0-9-]{0,63}$'),
    symptom TEXT NOT NULL CHECK (char_length(symptom) BETWEEN 1 AND 120),
    cause TEXT NOT NULL CHECK (char_length(cause) BETWEEN 1 AND 200),
    avoidance TEXT NOT NULL CHECK (char_length(avoidance) BETWEEN 1 AND 280),
    check_kind TEXT NOT NULL CHECK (check_kind IN ('command', 'id')),
    check_value TEXT NOT NULL CHECK (char_length(check_value) BETWEEN 1 AND 280),
    keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    source TEXT NOT NULL CHECK (source IN ('seed', 'project', 'retired')),
    severity TEXT NOT NULL DEFAULT 'warn'
      CHECK (severity IN ('block', 'warn', 'info')),
    updated_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK ((project_id IS NULL) = (source = 'seed')))`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS project_pitfalls_global_id_idx
    ON project_pitfalls (pitfall_id) WHERE project_id IS NULL`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS project_pitfalls_project_id_idx
    ON project_pitfalls (project_id, pitfall_id) WHERE project_id IS NOT NULL`;
  await sql`CREATE TABLE IF NOT EXISTS project_pitfall_hits (
    project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
    pitfall_id TEXT NOT NULL,
    hit_count INTEGER NOT NULL DEFAULT 0 CHECK (hit_count >= 0),
    last_seen_at TIMESTAMPTZ,
    PRIMARY KEY (project_id, pitfall_id))`;
  // Copy former AgentWitch seeds onto their project before the sync retires
  // the global rows (mirrors 099; both steps idempotent).
  await moveAgentWitchProjectPitfalls();
  await syncGlobalProjectPitfallSeeds();
};

/** Idempotent CREATE + seed move/sync (DDL in 067, seed scope in 099). */
export const ensureProjectPitfallsSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = createTables().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  return state.promise;
};
