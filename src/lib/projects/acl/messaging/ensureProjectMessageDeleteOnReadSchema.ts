import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectMessageDeleteOnReadSchemaForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/** Idempotent DDL for delete-on-read / ack outcomes (full file: migration 056). */
export const ensureProjectMessageDeleteOnReadSchema = async (): Promise<void> => {
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
        ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_messages_read_delete_idx
        ON project_messages (read_at)
        WHERE read_at IS NOT NULL`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_message_outcomes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        message_id TEXT NOT NULL,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        recipient_user_id TEXT,
        recipient_membership_id TEXT,
        final_b2b_state TEXT,
        grok_wake_result TEXT,
        deleted_reason TEXT NOT NULL,
        message_created_at TIMESTAMPTZ,
        read_at TIMESTAMPTZ,
        deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (message_id)
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_message_outcomes_project_idx
        ON project_message_outcomes (project_id, deleted_at DESC)`;
    await sql`
      CREATE TABLE IF NOT EXISTS project_message_computer_acks (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        message_id TEXT NOT NULL,
        acked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (project_id, message_id)
      )`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_message_computer_acks_message_idx
        ON project_message_computer_acks (message_id)`;
    state.ensured = true;
  })();

  return state.promise;
};
