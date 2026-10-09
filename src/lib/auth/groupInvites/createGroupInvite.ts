import { ensureGroupInvitesSchema } from "@/lib/auth/groupInvites/ensureGroupInvitesSchema";
import { asRowArray, getSql } from "@/lib/db";

export type GroupInviteRole = "group_admin" | "user";

/**
 * Invite an existing user. One open invite per person and company; a new one replaces the old
 * role. Nobody is added to the company by this: the invitee decides.
 */
export const createGroupInvite = async (input: {
  readonly groupId: string;
  readonly inviteeUserId: string;
  readonly role: GroupInviteRole;
  readonly invitedByUserId: string;
}): Promise<{ readonly id: string }> => {
  await ensureGroupInvitesSchema();
  const rows = asRowArray(
    await getSql()`
      INSERT INTO group_invites (group_id, invitee_user_id, role, invited_by_user_id)
      VALUES (${input.groupId}, ${input.inviteeUserId}, ${input.role}, ${input.invitedByUserId})
      ON CONFLICT (group_id, invitee_user_id) WHERE status = 'pending'
      DO UPDATE SET role = EXCLUDED.role, invited_by_user_id = EXCLUDED.invited_by_user_id,
        created_at = NOW()
      RETURNING id
    `,
  );
  return { id: String(rows[0].id) };
};
