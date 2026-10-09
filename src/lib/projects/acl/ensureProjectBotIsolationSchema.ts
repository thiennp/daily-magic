import { ensureProjectGuidanceSeenSchema } from "@/lib/projects/acl/ensureProjectGuidanceSeenSchema";
import { getSql } from "@/lib/db";

/** Additive columns for "block this bot from other people's bots" (invite checkbox). */
export const ensureProjectBotIsolationSchema = async (): Promise<void> => {
  const sql = getSql();
  await sql`ALTER TABLE project_invites
    ADD COLUMN IF NOT EXISTS isolate_bots BOOLEAN NOT NULL DEFAULT FALSE`;
  // Who invited this seat, and whether it may only talk to its inviter's group.
  await sql`ALTER TABLE project_memberships
    ADD COLUMN IF NOT EXISTS invited_by_user_id TEXT`;
  await sql`ALTER TABLE project_memberships
    ADD COLUMN IF NOT EXISTS isolated_from_other_bots BOOLEAN NOT NULL DEFAULT FALSE`;
  await ensureProjectGuidanceSeenSchema();
};
