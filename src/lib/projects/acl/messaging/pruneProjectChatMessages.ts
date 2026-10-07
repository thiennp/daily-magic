import { messageHasSyncedComputerAckForPrune } from "@/lib/projects/acl/messaging/messageHasSyncedComputerAckForPrune";
import { projectHasSyncedComputerForPrune } from "@/lib/projects/acl/messaging/projectHasSyncedComputerForPrune";
import {
  PROJECT_MESSAGE_KEEP_PER_CHAT,
  PROJECT_MESSAGE_PRUNE_OUTCOME_REASON,
} from "@/lib/projects/acl/messaging/projectMessagePrune.constants";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Delete rows past newest keep-N in one chat when ack-before-prune holds.
 * Writes thin outcomes. Idempotent. Never deletes chats themselves.
 */
export const pruneProjectChatMessages = async (input: {
  readonly projectId: string;
  readonly chatKey: string;
  readonly keep?: number;
}): Promise<number> => {
  const keep = input.keep ?? PROJECT_MESSAGE_KEEP_PER_CHAT;
  if (!(await projectHasSyncedComputerForPrune(input.projectId))) {
    return 0;
  }
  const sql = getSql();
  const candidates = asRowArray(
    await sql`
      SELECT id FROM project_messages
      WHERE project_id = ${input.projectId}
        AND chat_key = ${input.chatKey}
        AND archived_at IS NULL
      ORDER BY created_at DESC, id DESC
      OFFSET ${keep}::int
    `,
  );
  let deleted = 0;
  for (const row of candidates) {
    const messageId = String(row.id);
    const prunable = await messageHasSyncedComputerAckForPrune({
      projectId: input.projectId,
      messageId,
    });
    if (!prunable) {
      continue;
    }
    await sql`
      INSERT INTO project_message_outcomes (
        message_id, project_id, recipient_user_id, recipient_membership_id,
        final_b2b_state, grok_wake_result, deleted_reason,
        message_created_at, read_at
      )
      SELECT
        m.id, m.project_id, m.to_user_id, m.to_membership_id,
        NULL, NULL, ${PROJECT_MESSAGE_PRUNE_OUTCOME_REASON},
        m.created_at, m.read_at
      FROM project_messages m
      WHERE m.id = ${messageId}
      ON CONFLICT (message_id) DO NOTHING
    `;
    const result = asRowArray(
      await sql`
        DELETE FROM project_messages
        WHERE id = ${messageId}
          AND archived_at IS NULL
        RETURNING id
      `,
    );
    if (result.length > 0) {
      deleted += 1;
    }
  }
  return deleted;
};
