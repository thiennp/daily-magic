import { CLAIM_BOT_ENTRY_WINDOW_MS } from "@/lib/agentAccess/claimBot/claimBot.constants";
import { decideClaimEntryLock } from "@/lib/agentAccess/claimBot/decideClaimEntryLock";
import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimEntryGate =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "locked"; readonly retryAt: string };

/** Read lock + recent failures; refuse when decideClaimEntryLock says locked. */
export const resolveClaimEntryGate = async (input: {
  readonly userId: string;
  readonly nowMs?: number;
}): Promise<ClaimEntryGate> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  const nowMs = input.nowMs ?? Date.now();
  const since = new Date(nowMs - CLAIM_BOT_ENTRY_WINDOW_MS).toISOString();
  const lockRows = asRowArray(
    await sql`
      SELECT locked_until
      FROM agent_bot_claim_entry_locks
      WHERE user_id = ${input.userId}
      LIMIT 1
    `,
  );
  const failRows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS failure_count
      FROM agent_bot_claim_entry_failures
      WHERE user_id = ${input.userId}
        AND created_at > ${since}
    `,
  );
  const lockedUntilRaw = lockRows[0]?.locked_until;
  const lockedUntilMs =
    lockedUntilRaw instanceof Date
      ? lockedUntilRaw.getTime()
      : typeof lockedUntilRaw === "string"
        ? Date.parse(lockedUntilRaw)
        : null;
  const failureCount = Number(failRows[0]?.failure_count ?? 0);
  const decision = decideClaimEntryLock({
    nowMs,
    lockedUntilMs:
      lockedUntilMs !== null && !Number.isNaN(lockedUntilMs)
        ? lockedUntilMs
        : null,
    failureCountInWindow: failureCount,
  });
  if (decision.status === "locked") {
    return {
      ok: false,
      code: "locked",
      retryAt: decision.retryAt.toISOString(),
    };
  }
  return { ok: true };
};
