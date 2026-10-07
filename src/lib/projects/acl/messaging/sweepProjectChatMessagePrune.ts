import {
  PROJECT_MESSAGE_KEEP_PER_CHAT,
  PROJECT_MESSAGE_PRUNE_SWEEP_CHAT_LIMIT,
} from "@/lib/projects/acl/messaging/projectMessagePrune.constants";
import { pruneProjectChatMessages } from "@/lib/projects/acl/messaging/pruneProjectChatMessages";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Ticker/cron: prune chats whose live row count exceeds keep-N.
 * Replaces delete-on-read hard deletes.
 */
export const sweepProjectChatMessagePrune = async (): Promise<number> => {
  try {
    const sql = getSql();
    const keep = PROJECT_MESSAGE_KEEP_PER_CHAT;
    const limit = PROJECT_MESSAGE_PRUNE_SWEEP_CHAT_LIMIT;
    const chats = asRowArray(
      await sql`
        SELECT project_id, chat_key, COUNT(*)::int AS c
        FROM project_messages
        WHERE archived_at IS NULL
        GROUP BY project_id, chat_key
        HAVING COUNT(*) > ${keep}::int
        ORDER BY COUNT(*) DESC
        LIMIT ${limit}::int
      `,
    );
    let total = 0;
    for (const row of chats) {
      total += await pruneProjectChatMessages({
        projectId: String(row.project_id),
        chatKey: String(row.chat_key),
      });
    }
    return total;
  } catch (error: unknown) {
    console.error("project message prune sweep failed", {
      error: error instanceof Error ? error.message : "prune_sweep_failed",
    });
    return 0;
  }
};
