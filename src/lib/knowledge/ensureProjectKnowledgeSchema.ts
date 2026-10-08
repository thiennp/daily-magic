import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

/** Idempotent CREATE matching db/migrations/114-project-knowledge-daily.sql. */
export const ensureProjectKnowledgeSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    const sql = getSql();
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS knowledge_capabilities JSONB
    `;
    await sql`
      ALTER TABLE agent_witch_devices
      ADD COLUMN IF NOT EXISTS knowledge_capabilities_at TIMESTAMPTZ
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS project_knowledge_daily (
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
        day DATE NOT NULL,
        runs INTEGER NOT NULL DEFAULT 0,
        holdout_runs INTEGER NOT NULL DEFAULT 0,
        runs_with INTEGER NOT NULL DEFAULT 0,
        repeats_with INTEGER NOT NULL DEFAULT 0,
        repeats_holdout INTEGER NOT NULL DEFAULT 0,
        cards_injected INTEGER NOT NULL DEFAULT 0,
        injected_tokens INTEGER NOT NULL DEFAULT 0,
        mistakes_avoided INTEGER NOT NULL DEFAULT 0,
        est_tokens_saved INTEGER NOT NULL DEFAULT 0,
        correction_turns INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (project_id, device_id, day)
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_knowledge_daily_project_day_idx
      ON project_knowledge_daily (project_id, day DESC)`;
    state.ensured = true;
  })();

  return state.promise;
};
