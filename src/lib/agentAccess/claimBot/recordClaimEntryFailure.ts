import { randomUUID } from "node:crypto";

import { CLAIM_BOT_ENTRY_WINDOW_MS } from "@/lib/agentAccess/claimBot/claimBot.constants";
import { decideClaimEntryAfterFailure } from "@/lib/agentAccess/claimBot/decideClaimEntryLock";
import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { asRowArray, getSql } from "@/lib/db";

export type RecordClaimEntryFailureResult =
  | { readonly locked: false }
  | { readonly locked: true; readonly retryAt: string };

/** Insert a failure; engage DB lock when the decide boundary is crossed. */
export const recordClaimEntryFailure = async (input: {
  readonly userId: string;
  readonly nowMs?: number;
}): Promise<RecordClaimEntryFailureResult> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const nowMs = input.nowMs ?? Date.now();
  const since = new Date(nowMs - CLAIM_BOT_ENTRY_WINDOW_MS).toISOString();
  const prior = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS failure_count
      FROM agent_bot_claim_entry_failures
      WHERE user_id = ${input.userId}
        AND created_at > ${since}
    `,
  );
  const previousCount = Number(prior[0]?.failure_count ?? 0);
  await sql`
    INSERT INTO agent_bot_claim_entry_failures (id, user_id, created_at)
    VALUES (${randomUUID()}, ${input.userId}, ${new Date(nowMs).toISOString()})
  `;
  const decision = decideClaimEntryAfterFailure({
    previousFailureCountInWindow: previousCount,
    nowMs,
  });
  if (decision.status !== "locked") {
    return { locked: false };
  }
  await sql`
    INSERT INTO agent_bot_claim_entry_locks (user_id, locked_until, updated_at)
    VALUES (
      ${input.userId},
      ${decision.retryAt.toISOString()},
      ${new Date(nowMs).toISOString()}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      locked_until = EXCLUDED.locked_until,
      updated_at = EXCLUDED.updated_at
  `;
  return { locked: true, retryAt: decision.retryAt.toISOString() };
};
