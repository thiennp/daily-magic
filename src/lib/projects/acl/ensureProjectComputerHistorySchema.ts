import { asRowArray, getSql } from "@/lib/db";

const state: { ensured: boolean } = { ensured: false };

export const resetProjectComputerHistorySchemaForTests = (): void => {
  state.ensured = false;
};

/**
 * Idempotent ensure for History tables (migrations 059–060), once per process.
 * project_message_computer_acks CREATE lives only in migration 056.
 * Soft ensure is additive only (ADD COLUMN IF NOT EXISTS + CREATE INDEX IF NOT
 * EXISTS) when the table exists (to_regclass). Backfill / DELETE nulls /
 * SET NOT NULL stay only in migration 060.
 */
export const ensureProjectComputerHistorySchema = async (): Promise<void> => {
  if (state.ensured) {
    return;
  }
  const sql = getSql();
  await sql`CREATE TABLE IF NOT EXISTS project_computer_history_settings (
    project_id TEXT PRIMARY KEY REFERENCES user_projects(id) ON DELETE CASCADE,
    state TEXT NOT NULL DEFAULT 'off'
      CHECK (state IN ('off', 'on_configuring', 'on_ready', 'degraded')),
    state_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_unsaved_wake_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`ALTER TABLE project_computer_history_settings
    ADD COLUMN IF NOT EXISTS last_unsaved_wake_at TIMESTAMPTZ`;
  const acksTable = asRowArray(
    await sql`SELECT to_regclass('public.project_message_computer_acks') AS t`,
  );
  if (acksTable[0]?.t != null) {
    await upgradeProjectMessageComputerAcks(sql);
  }
  state.ensured = true;
};

const upgradeProjectMessageComputerAcks = async (
  sql: ReturnType<typeof getSql>,
): Promise<void> => {
  await sql`ALTER TABLE project_message_computer_acks
    ADD COLUMN IF NOT EXISTS device_id TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS project_message_computer_acks_acked_idx
    ON project_message_computer_acks (acked_at)`;
  await sql`CREATE INDEX IF NOT EXISTS project_message_computer_acks_message_idx
    ON project_message_computer_acks (message_id)`;
};
