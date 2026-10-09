import { asRowArray, getSql } from "@/lib/db";

/**
 * Join: remember who invited this seat (the person, even when a bot made the invite) and whether its invite asked to block
 * it from other people's bots. Never throws (a failed write must not fail the
 * join; the seat then stays unrestricted).
 */
export const applyBotInviteIsolation = async (inserted: {
  readonly membership: { readonly id: string };
  readonly request: { readonly inviteId: string | null };
}): Promise<void> => {
  const { id: membershipId } = inserted.membership;
  const { inviteId } = inserted.request;
  if (inviteId === null) return;
  try {
    const sql = getSql();
    const invites = asRowArray(
      await sql`
        SELECT created_by_user_id, bound_owner_user_id, isolate_bots
        FROM project_invites
        WHERE id = ${inviteId} LIMIT 1
      `,
    );
    if (invites.length === 0) return;
    // A bot-made invite belongs to the person the bot acts for, not to the bot's own user.
    const inviterUserId = String(
      invites[0].bound_owner_user_id ?? invites[0].created_by_user_id,
    );
    await sql`
      UPDATE project_memberships SET
        invited_by_user_id = ${inviterUserId},
        isolated_from_other_bots = ${invites[0].isolate_bots === true}
      WHERE id = ${membershipId}
    `;
  } catch (error: unknown) {
    console.error("bot invite isolation on join failed", {
      membershipId,
      error: error instanceof Error ? error.message : "apply_failed",
    });
  }
};
