import { deleteProjectMessageWithOutcome } from "@/lib/projects/acl/messaging/deleteProjectMessageWithOutcome";
import { isProjectMessageReadyForDeleteOnRead } from "@/lib/projects/acl/messaging/isProjectMessageReadyForDeleteOnRead";
import { loadProjectMessageDeleteSnapshot } from "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Hard-delete messages that are already read and whose deliveries are terminal
 * or unwatched. Invoked from the silence ticker / cron. Never throws.
 *
 * computerAck composition (History 551bf17d): when that feature is off, the
 * delete path is unchanged. When ready/degraded, deleteProjectMessageWithOutcome
 * requires a project_message_computer_acks row first.
 */
export const deleteReadProjectMessages = async (): Promise<number> => {
  try {
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT id FROM project_messages
        WHERE read_at IS NOT NULL
        ORDER BY read_at ASC
        LIMIT 100
      `,
    );
    let deleted = 0;
    for (const row of rows) {
      const messageId = String(row.id);
      const snapshot = await loadProjectMessageDeleteSnapshot({ messageId });
      if (snapshot === null) {
        continue;
      }
      if (
        !isProjectMessageReadyForDeleteOnRead({
          readAt: snapshot.readAt,
          deliveryStates: snapshot.deliveryStates,
        })
      ) {
        continue;
      }
      const result = await deleteProjectMessageWithOutcome({
        messageId,
        deletedReason: "delete_on_read",
      });
      if (result.ok) {
        deleted += 1;
      }
    }
    return deleted;
  } catch (error: unknown) {
    console.error("project message delete-on-read failed", {
      error: error instanceof Error ? error.message : "delete_on_read_failed",
    });
    return 0;
  }
};
