import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectTaskRecordsSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE matching db/migrations/109-project-task-records.sql. */
export const ensureProjectTaskRecordsSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_task_records (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        created_by_membership_id TEXT
          REFERENCES project_memberships(id) ON DELETE SET NULL,
        owner_membership_id TEXT
          REFERENCES project_memberships(id) ON DELETE SET NULL,
        title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
        description TEXT
          CHECK (description IS NULL OR char_length(description) <= 200),
        status TEXT NOT NULL DEFAULT 'queued'
          CHECK (status IN ('queued', 'planned', 'in_progress', 'blocked', 'done', 'cancelled')),
        priority TEXT
          CHECK (priority IS NULL OR priority IN ('p0', 'p1', 'p2', 'p3')),
        stage TEXT
          CHECK (stage IS NULL OR stage IN ('design', 'en', 'build', 'ready', 'live')),
        tip_sha TEXT
          CHECK (tip_sha IS NULL OR tip_sha ~ '^[0-9a-f]{7,40}$'),
        depends_on TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[]
          CHECK (cardinality(depends_on) <= 10),
        plan_item_id TEXT
          REFERENCES project_task_records(id) ON DELETE SET NULL,
        started_at TIMESTAMPTZ,
        blocked_at TIMESTAMPTZ,
        done_at TIMESTAMPTZ,
        cancelled_at TIMESTAMPTZ,
        stage_times JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
    // Upgrade a pre-116 table (mirrors db/migrations/116): only swaps the
    // status CHECK when it still lacks 'cancelled', so restarts are no-ops.
    await sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conrelid = 'project_task_records'::regclass
            AND conname = 'project_task_records_status_check'
            AND pg_get_constraintdef(oid) NOT LIKE '%cancelled%'
        ) THEN
          ALTER TABLE project_task_records
            DROP CONSTRAINT project_task_records_status_check;
          ALTER TABLE project_task_records
            ADD CONSTRAINT project_task_records_status_check
            CHECK (status IN ('queued', 'planned', 'in_progress', 'blocked', 'done', 'cancelled'));
        END IF;
      END $$`;
    await sql`ALTER TABLE project_task_records ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ`;
    await sql`ALTER TABLE project_task_records ADD COLUMN IF NOT EXISTS agent_run_id TEXT`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_records_agent_run_idx
        ON project_task_records (agent_run_id) WHERE agent_run_id IS NOT NULL`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_records_project_created_idx
        ON project_task_records (project_id, created_at DESC, id DESC)`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_records_plan_item_idx
        ON project_task_records (plan_item_id) WHERE plan_item_id IS NOT NULL`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_records_creator_created_idx
        ON project_task_records (created_by_user_id, created_at DESC)`;
    state.ensured = true;
  })();

  try {
    await state.promise;
  } catch (error) {
    state.promise = null;
    throw error;
  }
};
