import { asRowArray, getSql } from "@/lib/db";
import { pruneProjectChatMessages } from "@/lib/projects/acl/messaging/pruneProjectChatMessages";

/**
 * computerAck landed. Keep-300: do not delete the held row. Optionally prune
 * that chat so rows past newest 300 with acks can leave Neon.
 * Returns whether any row was pruned (not whether the held message was deleted).
 */
export const deleteHeldProjectMessageAfterComputerAck = async (input: {
  readonly projectId: string;
  readonly messageId: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT chat_key, acked_at FROM project_messages
      WHERE id = ${input.messageId}
        AND project_id = ${input.projectId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return false;
  }
  const chatKey =
    rows[0].chat_key !== null && rows[0].chat_key !== undefined
      ? String(rows[0].chat_key)
      : "whole";
  const pruned = await pruneProjectChatMessages({
    projectId: input.projectId,
    chatKey,
  });
  return pruned > 0;
};
