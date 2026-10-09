import { getSql } from "@/lib/db";

const state = { ensured: false };

/** Runtime mirror of migration 131 (same pattern as the project ACL schema ensure). */
export const ensureGroupInvitesSchema = async (): Promise<void> => {
  if (state.ensured) return;
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS group_invites (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
      invitee_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      role TEXT NOT NULL CHECK (role IN ('group_admin', 'user')),
      invited_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'accepted', 'declined')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      decided_at TIMESTAMPTZ
    )
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS group_invites_one_pending
    ON group_invites (group_id, invitee_user_id) WHERE status = 'pending'
  `;
  state.ensured = true;
};
