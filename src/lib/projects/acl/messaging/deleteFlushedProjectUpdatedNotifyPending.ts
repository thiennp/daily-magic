import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Remove a flushed row after notify (flushed → idle). Lands only while flushed.
 */
export const deleteFlushedProjectUpdatedNotifyPending = async (input: {
  readonly projectId: string;
}): Promise<boolean> => {
  const next = nextProjectUpdatedNotifyState("flushed", "notify_done");
  if (!next.ok || next.state !== "idle") {
    return false;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM project_updated_notify_pending
      WHERE project_id = ${input.projectId}
        AND state = 'flushed'
      RETURNING project_id
    `,
  );
  return rows.length > 0;
};
