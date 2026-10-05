import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { revokePendingClaimCodesForToken } from "@/lib/agentAccess/claimBot/revokePendingClaimCodesForToken";
import { asRowArray, getSql } from "@/lib/db";

export type UnclaimBotOwnershipResult =
  | { readonly ok: true; readonly tokenId: string }
  | { readonly ok: false; readonly code: "not_owner" | "not_found" };

/**
 * Owner-only unclaim: SET owner_user_id NULL WHERE owner_user_id = :user.
 * Revokes any pending claim codes for that token.
 */
export const unclaimBotOwnership = async (input: {
  readonly tokenId: string;
  readonly ownerUserId: string;
  readonly nowMs?: number;
}): Promise<UnclaimBotOwnershipResult> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE agent_access_tokens
      SET owner_user_id = NULL
      WHERE id = ${input.tokenId}
        AND owner_user_id = ${input.ownerUserId}
      RETURNING id
    `,
  );
  if (rows.length === 0) {
    const exists = asRowArray(
      await sql`
        SELECT id FROM agent_access_tokens WHERE id = ${input.tokenId} LIMIT 1
      `,
    );
    return {
      ok: false,
      code: exists.length === 0 ? "not_found" : "not_owner",
    };
  }
  await revokePendingClaimCodesForToken({
    tokenId: input.tokenId,
    nowMs: input.nowMs,
  });
  return { ok: true, tokenId: input.tokenId };
};
