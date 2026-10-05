import { ensureClaimBotSchema } from "@/lib/agentAccess/claimBot/ensureClaimBotSchema";
import { getSql } from "@/lib/db";

/** After a successful redeem, clear recent failures and any lock for this user. */
export const clearClaimEntryFailures = async (userId: string): Promise<void> => {
  await ensureClaimBotSchema();
  const sql = getSql();
  await sql`
    DELETE FROM agent_bot_claim_entry_failures WHERE user_id = ${userId}
  `;
  await sql`
    DELETE FROM agent_bot_claim_entry_locks WHERE user_id = ${userId}
  `;
};
