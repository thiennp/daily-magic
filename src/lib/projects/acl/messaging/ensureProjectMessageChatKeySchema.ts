import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetProjectMessageChatKeySchemaForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

/**
 * Soft ensure for keep-300 chat_key (migration 102). Additive only:
 * column + default + index. Unique-key swap on computer_acks stays in the
 * numbered migration (same pattern as 060 NOT NULL).
 */
export const ensureProjectMessageChatKeySchema = async (): Promise<void> => {
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
        ADD COLUMN IF NOT EXISTS chat_key TEXT`;
    await sql`
      UPDATE project_messages
      SET chat_key = 'whole'
      WHERE chat_key IS NULL OR chat_key = ''`;
    await sql`
      ALTER TABLE project_messages
        ALTER COLUMN chat_key SET DEFAULT 'whole'`;
    await sql`
      CREATE INDEX IF NOT EXISTS project_messages_chat_newest_idx
        ON project_messages (project_id, chat_key, created_at DESC, id DESC)`;
    state.ensured = true;
  })();

  return state.promise;
};
