import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import { PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS } from "@/lib/projects/acl/messaging/projectUpdatedNotifyReclaim.constants";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Reclaim flushed rows stuck longer than ~60s (notify failure or flusher crash)
 * back to pending so the next cron flush can claim them again.
 */
export const reclaimStaleFlushedProjectUpdatedNotifyPending = async (input: {
  readonly now: Date;
  readonly olderThanMs?: number;
}): Promise<number> => {
  const next = nextProjectUpdatedNotifyState("flushed", "reclaim_stale");
  if (!next.ok) {
    return 0;
  }
  const olderThanMs =
    input.olderThanMs ?? PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS;
  const cutoff = new Date(input.now.getTime() - olderThanMs).toISOString();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_updated_notify_pending
      SET state = ${next.state},
        updated_at = NOW()
      WHERE state = 'flushed'
        AND updated_at < ${cutoff}::timestamptz
      RETURNING project_id
    `,
  );
  return rows.length;
};
