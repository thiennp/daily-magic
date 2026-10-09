import { ensureGroupInvitesSchema } from "@/lib/auth/groupInvites/ensureGroupInvitesSchema";
import { asRowArray, getSql } from "@/lib/db";

export type DecideGroupInviteResult =
  | { readonly ok: true; readonly groupId: string }
  | { readonly ok: false; readonly code: "not_found" | "already_member" };

/**
 * The invitee (and only the invitee) accepts or declines. Accepting claims the pending invite and
 * adds the membership in one statement, so a double click or a race adds one seat at most.
 */
export const decideGroupInvite = async (input: {
  readonly inviteId: string;
  readonly userId: string;
  readonly accept: boolean;
}): Promise<DecideGroupInviteResult> => {
  await ensureGroupInvitesSchema();
  const sql = getSql();
  const claimed = asRowArray(
    await sql`
      UPDATE group_invites
      SET status = ${input.accept ? "accepted" : "declined"}, decided_at = NOW()
      WHERE id = ${input.inviteId} AND invitee_user_id = ${input.userId}
        AND status = 'pending'
      RETURNING group_id, role
    `,
  );
  if (claimed.length === 0) return { ok: false, code: "not_found" };
  const groupId = String(claimed[0].group_id);
  if (!input.accept) return { ok: true, groupId };
  const added = asRowArray(
    await sql`
      INSERT INTO group_memberships (group_id, user_id, role)
      VALUES (${groupId}, ${input.userId}, ${String(claimed[0].role)})
      ON CONFLICT (group_id, user_id) DO NOTHING
      RETURNING id
    `,
  );
  return added.length === 0
    ? { ok: false, code: "already_member" }
    : { ok: true, groupId };
};
