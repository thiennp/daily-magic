import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { deleteProjectMessageThroughLifecycle } from "@/lib/projects/acl/messaging/lifecycle/deleteProjectMessageThroughLifecycle";
import { loadProjectMessageDeleteSnapshot } from "@/lib/projects/acl/messaging/loadProjectMessageDeleteSnapshot";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Hard-delete read messages eligible for delete-on-read (notices: unwatched or
 * terminal; actionable/task.*: terminal only — listing does not ack). Cron/ticker.
 * Never throws.
 *
 * History ON (gated): lifecycle deleteFromCloud → deleteProjectMessageWithOutcome
 * → gateProjectMessageDelete deletes only after the folder-save computerAck.
 * Un-acked overdue messages are never age-purged here (flag + wake elsewhere).
 * History OFF: normal DOR. Ordering lives in
 * lifecycle/deleteProjectMessageThroughLifecycle.
 */
export const deleteReadProjectMessages = async (): Promise<number> => {
  try {
    // Tick/cron entry skips ACL routes; ensure once here for snapshot/outcome leaves.
    await ensureProjectAclSchema();
    const sql = getSql();
    const rows = asRowArray(
      await sql`
        SELECT id FROM project_messages
        WHERE read_at IS NOT NULL
        ORDER BY read_at ASC
        LIMIT 100
      `,
    );
    const deletedIds: string[] = [];
    for (const row of rows) {
      const messageId = String(row.id);
      const snapshot = await loadProjectMessageDeleteSnapshot({ messageId });
      if (snapshot === null) {
        continue;
      }
      // Lifecycle deleteFromCloud: DOR readiness → History gate → delete.
      const result = await deleteProjectMessageThroughLifecycle({
        snapshot,
        deletedReason: "delete_on_read",
      });
      if (result.ok) {
        deletedIds.push(messageId);
      }
    }
    return deletedIds.length;
  } catch (error: unknown) {
    console.error("project message delete-on-read failed", {
      error: error instanceof Error ? error.message : "delete_on_read_failed",
    });
    return 0;
  }
};
