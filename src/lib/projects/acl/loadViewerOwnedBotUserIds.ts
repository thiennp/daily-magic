import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Bot user ids (among `botUserIds`) that `viewerUserId` owns: a live
 * agent-access credential carries their owner_user_id (see isBotLinkedToOwnerUser).
 * Server-side only; the ids never reach the client.
 */
export const loadViewerOwnedBotUserIds = async (input: {
  readonly viewerUserId: string;
  readonly botUserIds: readonly string[];
}): Promise<ReadonlySet<string>> => {
  if (input.botUserIds.length === 0) return new Set();
  await ensureAgentAccessSchema();
  const ids = [...input.botUserIds];
  const rows = asRowArray(
    await getSql()`
      SELECT DISTINCT user_id FROM agent_access_tokens
      WHERE user_id = ANY(${ids}) AND owner_user_id = ${input.viewerUserId}
        AND revoked_at IS NULL AND (expires_at IS NULL OR expires_at > NOW())
    `,
  );
  return new Set(rows.map((row) => String(row.user_id)));
};
