import { getSql } from "@/lib/db";
import { ensureProjectTaskRecordsSchema } from "@/lib/projects/tasks/ensureProjectTaskRecordsSchema";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetTaskSyncSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent CREATE matching db/migrations/113-project-task-sync.sql. */
export const ensureTaskSyncSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    await ensureProjectTaskRecordsSchema();
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS project_task_sync_settings (
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        provider TEXT NOT NULL CHECK (provider IN ('linear')),
        enabled BOOLEAN NOT NULL DEFAULT FALSE,
        external_team_id TEXT,
        import_new BOOLEAN NOT NULL DEFAULT FALSE,
        webhook_id TEXT,
        webhook_secret_ciphertext TEXT,
        webhook_secret_iv TEXT,
        last_error TEXT,
        last_synced_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (project_id, provider)
      )`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_task_external_links (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        task_id TEXT NOT NULL REFERENCES project_task_records(id) ON DELETE CASCADE,
        provider TEXT NOT NULL CHECK (provider IN ('linear')),
        external_id TEXT NOT NULL,
        external_identifier TEXT,
        external_url TEXT,
        last_synced_hash TEXT,
        last_synced_at TIMESTAMPTZ,
        UNIQUE (task_id, provider),
        UNIQUE (provider, external_id)
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_task_external_links_project_idx
        ON project_task_external_links (project_id, provider)`;
    // db/migrations/117-project-task-sync-pull-state.sql
    await sql`
      ALTER TABLE project_task_external_links
        ADD COLUMN IF NOT EXISTS clipped_description_hash TEXT`;
    await sql`
      ALTER TABLE project_task_sync_settings
        ADD COLUMN IF NOT EXISTS last_pulled_at TIMESTAMPTZ`;
    state.ensured = true;
  })();

  try {
    await state.promise;
  } catch (error) {
    state.promise = null;
    throw error;
  }
};
