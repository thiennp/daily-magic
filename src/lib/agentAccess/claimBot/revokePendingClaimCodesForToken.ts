import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { getSql } from "@/lib/db";

/** Mark pending (issued) codes revoked — used on claim-elsewhere and unclaim. */
export const revokePendingClaimCodesForToken = async (input: {
  readonly tokenId: string;
  readonly nowMs?: number;
}): Promise<void> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const now = new Date(input.nowMs ?? Date.now()).toISOString();
  await sql`
    UPDATE agent_bot_claim_codes
    SET revoked_at = ${now}
    WHERE token_id = ${input.tokenId}
      AND redeemed_at IS NULL
      AND superseded_at IS NULL
      AND revoked_at IS NULL
  `;
};
