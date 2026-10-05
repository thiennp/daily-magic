import { clearClaimEntryFailures } from "@/lib/agentAccess/claimBot/clearClaimEntryFailures";
import { classifyRedeemMiss } from "@/lib/agentAccess/claimBot/classifyRedeemMiss";
import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { hashClaimBotCode } from "@/lib/agentAccess/claimBot/hashClaimBotCode";
import { resolveClaimEntryGate } from "@/lib/agentAccess/claimBot/resolveClaimEntryGate";
import { revokePendingClaimCodesForToken } from "@/lib/agentAccess/claimBot/revokePendingClaimCodesForToken";
import type { RedeemClaimBotCodeResult } from "@/lib/agentAccess/claimBot/types/RedeemClaimBotCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

export type { RedeemClaimBotCodeResult };

/**
 * Atomically: mark code redeemed (unexpired, unredeemed, not superseded/revoked)
 * AND set owner_user_id only when still NULL. No claimed→claimed transfer.
 */
export const redeemClaimBotCode = async (input: {
  readonly code: string;
  readonly claimantUserId: string;
  readonly nowMs?: number;
}): Promise<RedeemClaimBotCodeResult> => {
  const gate = await resolveClaimEntryGate({
    userId: input.claimantUserId,
    nowMs: input.nowMs,
  });
  if (!gate.ok) {
    return { ok: false, code: "locked", retryAt: gate.retryAt };
  }
  await ensureClaimBotSchema();
  const sql = getSql();
  const codeHash = hashClaimBotCode(input.code);
  const nowIso = new Date(input.nowMs ?? Date.now()).toISOString();
  const rows = asRowArray(
    await sql`
      WITH matched AS (
        SELECT c.id AS code_id, c.token_id, c.expires_at, c.redeemed_at,
               c.superseded_at, c.revoked_at, t.owner_user_id, t.user_id AS bot_user_id
        FROM agent_bot_claim_codes c
        INNER JOIN agent_access_tokens t ON t.id = c.token_id
        WHERE c.code_hash = ${codeHash}
        LIMIT 1
      ),
      claimed AS (
        UPDATE agent_access_tokens t
        SET owner_user_id = ${input.claimantUserId}
        FROM matched
        WHERE t.id = matched.token_id
          AND t.owner_user_id IS NULL
          AND matched.redeemed_at IS NULL
          AND matched.superseded_at IS NULL
          AND matched.revoked_at IS NULL
          AND matched.expires_at > ${nowIso}::timestamptz
        RETURNING t.id AS token_id, matched.code_id, matched.bot_user_id
      ),
      redeemed AS (
        UPDATE agent_bot_claim_codes c
        SET redeemed_at = ${nowIso}::timestamptz,
            redeemed_by_user_id = ${input.claimantUserId}
        FROM claimed
        WHERE c.id = claimed.code_id
        RETURNING claimed.token_id, claimed.bot_user_id
      )
      SELECT token_id, bot_user_id FROM redeemed
    `,
  );
  const row = rows[0];
  if (row !== undefined && typeof row.token_id === "string") {
    await revokePendingClaimCodesForToken({
      tokenId: row.token_id,
      nowMs: input.nowMs,
    });
    await clearClaimEntryFailures(input.claimantUserId);
    return {
      ok: true,
      tokenId: row.token_id,
      botUserId: String(row.bot_user_id),
    };
  }
  return classifyRedeemMiss({
    codeHash,
    claimantUserId: input.claimantUserId,
    nowMs: input.nowMs,
  });
};
