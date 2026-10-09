import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { asRowArray, getSql } from "@/lib/db";

/** True iff `userId` owns bot `botUserId` (live agent-access credential with their owner_user_id). */
export const isBotOwnedBy = async (
  botUserId: string,
  userId: string,
): Promise<boolean> => {
  await ensureAgentAccessSchema();
  return (
    asRowArray(
      await getSql()`
        SELECT 1 FROM agent_access_tokens
        WHERE user_id = ${botUserId} AND owner_user_id = ${userId}
          AND revoked_at IS NULL AND (expires_at IS NULL OR expires_at > NOW())
        LIMIT 1
      `,
    ).length > 0
  );
};
