import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

/** Idempotent CREATE matching db/migrations/141-project-skill-comparisons.sql. */
export const ensureProjectSkillComparisonsSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS project_skill_comparisons (
          id BIGSERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
          skill_id TEXT NOT NULL,
          old_version INTEGER NOT NULL CHECK (old_version > 0),
          new_version INTEGER NOT NULL CHECK (new_version > 0),
          check_id BIGINT,
          status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'decided')),
          winner TEXT CHECK (winner IS NULL OR winner IN ('old', 'new')),
          started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          decided_at TIMESTAMPTZ,
          decided_by_user_id TEXT
        )`;
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS project_skill_comparisons_running_idx
          ON project_skill_comparisons (project_id, skill_id) WHERE status = 'running'`;
      await sql`
        CREATE TABLE IF NOT EXISTS project_skill_serves (
          id BIGSERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
          skill_id TEXT NOT NULL,
          actor_user_id TEXT NOT NULL,
          version INTEGER NOT NULL,
          comparison_id BIGINT NOT NULL REFERENCES project_skill_comparisons(id) ON DELETE CASCADE,
          served_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )`;
      await sql`
        CREATE INDEX IF NOT EXISTS project_skill_serves_actor_idx
          ON project_skill_serves (project_id, skill_id, actor_user_id, served_at DESC)`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  await state.promise;
};
