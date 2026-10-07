import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { asRowArray, getSql } from "@/lib/db";

/**
 * DF-038 same-owner proof, server-side only: the bot user has a live
 * (unrevoked, unexpired) agent-access credential whose owner_user_id is the
 * given owner. owner_user_id is written only by human-side flows (claim-code
 * redeem by the signed-in owner, device-code confirm, owner-issued
 * credential) and cleared by owner unclaim; a bot can never set it itself.
 */
export const isBotLinkedToOwnerUser = async (input: {
  readonly botUserId: string;
  readonly ownerUserId: string;
}): Promise<boolean> => {
  if (input.botUserId === input.ownerUserId) {
    return false;
  }
  await ensureAgentAccessSchema();
  const rows = asRowArray(
    await getSql()`
      SELECT 1 AS linked
      FROM agent_access_tokens
      WHERE user_id = ${input.botUserId}
        AND owner_user_id = ${input.ownerUserId}
        AND revoked_at IS NULL
        AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    `,
  );
  return rows.length > 0;
};
