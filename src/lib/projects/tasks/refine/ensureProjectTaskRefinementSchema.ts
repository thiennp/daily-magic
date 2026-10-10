import { getSql } from "@/lib/db";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectTaskRefinementSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE matching db/migrations/135-project-task-refinement.sql. */
export const ensureProjectTaskRefinementSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;
  state.promise = (async () => {
    await ensureProjectTaskRecordsSchema();
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_task_refinement (
        task_id TEXT PRIMARY KEY REFERENCES project_task_records(id) ON DELETE CASCADE,
        project_id TEXT NOT NULL,
        parent_task_id TEXT REFERENCES project_task_records(id) ON DELETE CASCADE,
        skill_id TEXT,
        skill_params JSONB NOT NULL DEFAULT '{}'::jsonb
          CHECK (octet_length(skill_params::text) <= 1000),
        effort_tier TEXT NOT NULL DEFAULT 'low'
          CHECK (effort_tier IN ('script', 'low', 'medium', 'high')),
        attempts INTEGER NOT NULL DEFAULT 0,
        claimed_by_user_id TEXT,
        claim_fence INTEGER NOT NULL DEFAULT 0,
        lease_expires_at TIMESTAMPTZ,
        blocked_on TEXT CHECK (blocked_on IS NULL OR blocked_on IN ('skill', 'user')),
        block_count INTEGER NOT NULL DEFAULT 0,
        verify_signal TEXT
          CHECK (verify_signal IS NULL OR verify_signal IN ('exit_code', 'schema', 'checker', 'none')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_refinement_parent_idx
        ON project_task_refinement (parent_task_id) WHERE parent_task_id IS NOT NULL`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_refinement_blocked_idx
        ON project_task_refinement (project_id, blocked_on) WHERE blocked_on IS NOT NULL`;
    state.ensured = true;
  })();
  try {
    await state.promise;
  } catch (error) {
    state.promise = null;
    throw error;
  }
};
