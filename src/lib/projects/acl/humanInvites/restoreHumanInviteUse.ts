import { getSql } from "@/lib/db";

/** Undo a claim (bot redeem restore pattern) if a later step fails outside a CTE. */
export const restoreHumanInviteUse = async (inviteId: string): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_human_invites
    SET uses_remaining = uses_remaining + 1,
        redeemed_at = NULL,
        redeemed_by_user_id = NULL
    WHERE id = ${inviteId}
  `;
};
