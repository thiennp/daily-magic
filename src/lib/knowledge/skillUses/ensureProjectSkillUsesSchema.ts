import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

/** Idempotent CREATE matching db/migrations/138-project-skill-uses.sql. */
export const ensureProjectSkillUsesSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS project_skill_uses (
          id BIGSERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
          skill_id TEXT NOT NULL,
          skill_version INTEGER NOT NULL CHECK (skill_version > 0),
          task_id TEXT NOT NULL,
          fence INTEGER NOT NULL,
          source TEXT NOT NULL CHECK (source IN ('assigned', 'lookup')),
          used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          outcome TEXT CHECK (outcome IS NULL OR outcome IN ('done', 'failed', 'blocked', 'released')),
          reason_fingerprint TEXT,
          released_at TIMESTAMPTZ,
          UNIQUE (task_id, fence, skill_id)
        )`;
      await sql`
        CREATE INDEX IF NOT EXISTS project_skill_uses_skill_idx
          ON project_skill_uses (project_id, skill_id, skill_version, used_at)`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  await state.promise;
};
