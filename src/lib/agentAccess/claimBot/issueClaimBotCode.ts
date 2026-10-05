import { randomUUID } from "node:crypto";

import { CLAIM_BOT_CODE_TTL_MS } from "@/lib/agentAccess/claimBot/claimBot.constants";
import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import {
  createClaimBotCode,
  hashClaimBotCode,
} from "@/lib/agentAccess/claimBot/hashClaimBotCode";
import { asRowArray, getSql } from "@/lib/db";

export type IssueClaimBotCodeResult =
  | {
      readonly ok: true;
      readonly code: string;
      readonly expiresAt: string;
      readonly tokenId: string;
    }
  | {
      readonly ok: false;
      readonly code: "already_claimed" | "token_not_found";
    };

/**
 * Issue a short-lived single-use claim code for the Bearer token row.
 * Supersedes any earlier unused code. Refuses if owner_user_id is set.
 */
export const issueClaimBotCode = async (input: {
  readonly tokenHash: string;
  readonly nowMs?: number;
}): Promise<IssueClaimBotCodeResult> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const tokenRows = asRowArray(
    await sql`
      SELECT id, owner_user_id
      FROM agent_access_tokens
      WHERE token_hash = ${input.tokenHash}
      LIMIT 1
    `,
  );
  const token = tokenRows[0];
  if (token === undefined || typeof token.id !== "string") {
    return { ok: false, code: "token_not_found" };
  }
  if (typeof token.owner_user_id === "string" && token.owner_user_id.length > 0) {
    return { ok: false, code: "already_claimed" };
  }
  const nowMs = input.nowMs ?? Date.now();
  const expiresAt = new Date(nowMs + CLAIM_BOT_CODE_TTL_MS);
  const plaintext = createClaimBotCode();
  const codeHash = hashClaimBotCode(plaintext);
  await sql`
    UPDATE agent_bot_claim_codes
    SET superseded_at = ${new Date(nowMs).toISOString()}
    WHERE token_id = ${token.id}
      AND redeemed_at IS NULL
      AND superseded_at IS NULL
      AND revoked_at IS NULL
  `;
  await sql`
    INSERT INTO agent_bot_claim_codes (
      id, token_id, code_hash, expires_at, created_at
    )
    VALUES (
      ${randomUUID()},
      ${token.id},
      ${codeHash},
      ${expiresAt.toISOString()},
      ${new Date(nowMs).toISOString()}
    )
  `;
  return {
    ok: true,
    code: plaintext,
    expiresAt: expiresAt.toISOString(),
    tokenId: token.id,
  };
};
