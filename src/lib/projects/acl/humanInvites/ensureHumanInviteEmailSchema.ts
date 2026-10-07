import type { getSql } from "@/lib/db";

type Sql = ReturnType<typeof getSql>;

/**
 * Runtime mirror of migration 064 (email lock) + 108 columns + unique indexes (CHECKs and the
 * status backfill live only in the migration). Called from ensureProjectAclSchema.
 */
export const ensureHumanInviteEmailSchema = async (sql: Sql): Promise<void> => {
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS require_email_match BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending'`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS delivery TEXT NOT NULL DEFAULT 'link'`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS requires_approval BOOLEAN NOT NULL DEFAULT false`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS accepted_by_user_id TEXT
    REFERENCES users(id) ON DELETE SET NULL`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS accepted_display_name TEXT`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS decided_at TIMESTAMPTZ`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS decided_by_user_id TEXT
    REFERENCES users(id) ON DELETE SET NULL`;
  await sql`ALTER TABLE project_human_invites
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS project_human_invites_open_email_unique_idx
    ON project_human_invites (project_id, email)
    WHERE delivery = 'email' AND status IN ('pending', 'accepted')`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS project_human_invites_accepted_user_unique_idx
    ON project_human_invites (project_id, accepted_by_user_id)
    WHERE status = 'accepted'`;
};
