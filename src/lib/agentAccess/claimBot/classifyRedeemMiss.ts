import { recordClaimEntryFailure } from "@/lib/agentAccess/claimBot/recordClaimEntryFailure";
import type { RedeemClaimBotCodeResult } from "@/lib/agentAccess/claimBot/types/RedeemClaimBotCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

/** After atomic redeem wrote nothing: classify why and count a failure. */
export const classifyRedeemMiss = async (input: {
  readonly codeHash: string;
  readonly claimantUserId: string;
  readonly nowMs?: number;
}): Promise<RedeemClaimBotCodeResult> => {
  const sql = getSql();
  const nowIso = new Date(input.nowMs ?? Date.now()).toISOString();
  const rows = asRowArray(
    await sql`
      SELECT c.redeemed_at, c.superseded_at, c.revoked_at, c.expires_at,
             t.owner_user_id
      FROM agent_bot_claim_codes c
      INNER JOIN agent_access_tokens t ON t.id = c.token_id
      WHERE c.code_hash = ${input.codeHash}
      LIMIT 1
    `,
  );
  const fail = await recordClaimEntryFailure({
    userId: input.claimantUserId,
    nowMs: input.nowMs,
  });
  if (fail.locked) {
    return { ok: false, code: "locked", retryAt: fail.retryAt };
  }
  const row = rows[0];
  if (row === undefined) {
    return { ok: false, code: "invalid_code" };
  }
  if (row.redeemed_at !== null && row.redeemed_at !== undefined) {
    return { ok: false, code: "already_redeemed" };
  }
  if (typeof row.owner_user_id === "string" && row.owner_user_id.length > 0) {
    return { ok: false, code: "already_claimed" };
  }
  const expiresAt =
    row.expires_at instanceof Date
      ? row.expires_at.toISOString()
      : String(row.expires_at ?? "");
  if (expiresAt.length > 0 && expiresAt <= nowIso) {
    return { ok: false, code: "expired" };
  }
  return { ok: false, code: "invalid_code" };
};
