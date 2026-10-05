import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimedProjectUpdatedNotifyPending = {
  readonly projectId: string;
  readonly fields: readonly string[];
  readonly actorUserId: string | null;
};

/**
 * Claim due pending rows (pending → flushed) for notify.
 * Conditional on state so concurrent flushers cannot double-claim.
 */
export const claimDueProjectUpdatedNotifyPending = async (input: {
  readonly now: Date;
}): Promise<readonly ClaimedProjectUpdatedNotifyPending[]> => {
  const next = nextProjectUpdatedNotifyState("pending", "flush_due");
  if (!next.ok) {
    return [];
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_updated_notify_pending
      SET state = ${next.state},
        updated_at = NOW()
      WHERE state = 'pending'
        AND flush_after <= ${input.now.toISOString()}::timestamptz
      RETURNING project_id, fields, actor_user_id
    `,
  );
  return rows.map((row) => ({
    projectId: String(row.project_id),
    fields: Array.isArray(row.fields)
      ? row.fields.map((field) => String(field))
      : [],
    actorUserId:
      typeof row.actor_user_id === "string" ? row.actor_user_id : null,
  }));
};
