import { getSql } from "@/lib/db";

/** Mark an invite: the bot that joins with it is blocked from other people's bots. */
export const setProjectInviteIsolateBots = async (
  inviteId: string,
): Promise<void> => {
  await getSql()`
    UPDATE project_invites SET isolate_bots = TRUE WHERE id = ${inviteId}
  `;
};
