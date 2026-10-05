import { getSql } from "@/lib/db";

const state: { promise: Promise<void> | null } = { promise: null };

export const resetProjectMessengerSchemaEnsureForTests = (): void => {
  state.promise = null;
};

/** Idempotent DDL for messenger unread rows (full file: migration 065). */
export const ensureProjectMessengerSchema = async (): Promise<void> => {
  if (state.promise === null) {
    state.promise = (async () => {
      const sql = getSql();
      await sql`CREATE TABLE IF NOT EXISTS project_messenger_thread_reads (
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
        thread_key TEXT NOT NULL,
        last_read_message_id TEXT,
        last_read_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, project_id, thread_key))`;
    })().catch((error: unknown) => {
      state.promise = null;
      throw error;
    });
  }
  return state.promise;
};
