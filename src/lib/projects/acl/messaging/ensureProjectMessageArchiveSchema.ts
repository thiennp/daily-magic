import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectMessageArchiveSchemaForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/**
 * Idempotent DDL for Inbox Clear all → archive (migration 098).
 * Two nullable columns + (project_id, archived_at) index. Never deletes.
 * Called once from ensureProjectAclSchema.
 */
export const ensureProjectMessageArchiveSchema = async (): Promise<void> => {
  if (state.ensured) {
    return;
  }
  if (state.promise !== null) {
    return state.promise;
  }

  state.promise = (async () => {
    const sql = getSql();
    await sql`
      ALTER TABLE project_messages
        ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ`;
    await sql`
      ALTER TABLE project_messages
        ADD COLUMN IF NOT EXISTS archived_by TEXT`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_messages_project_archived_idx
        ON project_messages (project_id, archived_at)`;
    state.ensured = true;
  })();

  return state.promise;
};
