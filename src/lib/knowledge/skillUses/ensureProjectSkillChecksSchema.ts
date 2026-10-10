import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

/** Idempotent CREATE matching db/migrations/139-project-skill-checks.sql. */
export const ensureProjectSkillChecksSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS project_skill_checks (
          id BIGSERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
          skill_id TEXT NOT NULL,
          skill_version INTEGER NOT NULL CHECK (skill_version > 0),
          uses_at_check INTEGER NOT NULL CHECK (uses_at_check > 0),
          last_use_id BIGINT NOT NULL,
          trigger TEXT NOT NULL CHECK (trigger IN ('checkpoint', 'failure')),
          status TEXT NOT NULL DEFAULT 'due' CHECK (status IN ('due', 'judged', 'failed')),
          verdict TEXT CHECK (verdict IS NULL OR verdict IN ('fine', 'improve')),
          note TEXT,
          proposed_body TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          judged_at TIMESTAMPTZ,
          UNIQUE (project_id, skill_id, skill_version, uses_at_check)
        )`;
      await sql`
        CREATE INDEX IF NOT EXISTS project_skill_checks_due_idx
          ON project_skill_checks (project_id, status, created_at)`;
      await sql`
        ALTER TABLE project_skill_checks
          ADD COLUMN IF NOT EXISTS decision TEXT
            CHECK (decision IS NULL OR decision IN ('old', 'new', 'both')),
          ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS decided_by_user_id TEXT,
          ADD COLUMN IF NOT EXISTS new_version INTEGER`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  await state.promise;
};
