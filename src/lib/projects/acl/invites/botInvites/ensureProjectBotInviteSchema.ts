import { getSql } from "@/lib/db";

const state: { ready: Promise<void> | null } = { ready: null };

/** Mirrors migration 112 (bot-made invites). Additive and idempotent. */
const runDdl = async (): Promise<void> => {
  const sql = getSql();
  await sql`ALTER TABLE project_invites
    ADD COLUMN IF NOT EXISTS created_by_membership_id TEXT
      REFERENCES project_memberships(id) ON DELETE CASCADE`;
  await sql`ALTER TABLE project_invites
    ADD COLUMN IF NOT EXISTS bound_owner_user_id TEXT`;
  // Add the guard once; no DROP/ADD lock churn on every cold start.
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'project_invites_bot_made_guard_check'
      ) THEN
        ALTER TABLE project_invites
          ADD CONSTRAINT project_invites_bot_made_guard_check CHECK (
            created_by_membership_id IS NULL
            OR (max_uses = 1 AND auto_approve = FALSE
                AND bound_owner_user_id IS NOT NULL));
      END IF;
    END $$
  `;
  await sql`CREATE INDEX IF NOT EXISTS project_invites_created_by_membership_idx
    ON project_invites (created_by_membership_id)
    WHERE created_by_membership_id IS NOT NULL`;
};

export const ensureProjectBotInviteSchema = async (): Promise<void> => {
  if (state.ready === null) {
    state.ready = runDdl().catch((error: unknown) => {
      state.ready = null;
      throw error;
    });
  }
  await state.ready;
};

export const resetProjectBotInviteSchemaForTests = (): void => {
  state.ready = null;
};
