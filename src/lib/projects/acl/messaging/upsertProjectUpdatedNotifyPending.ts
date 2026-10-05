import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import { asRowArray, getSql } from "@/lib/db";
import type { ProjectUpdatedSummaryField } from "@/lib/projects/acl/messaging/projectMessage.constants";
import { PROJECT_UPDATED_DEBOUNCE_MS } from "@/lib/projects/acl/messaging/projectMessage.constants";

/**
 * Insert or extend a pending notify row (trailing debounce).
 * Merges fields; resets flush_after to now + PROJECT_UPDATED_DEBOUNCE_MS.
 * Returns true when a pending row is stored.
 */
export const upsertProjectUpdatedNotifyPending = async (input: {
  readonly projectId: string;
  readonly fields: readonly ProjectUpdatedSummaryField[];
  readonly actorUserId?: string;
  readonly now: Date;
  readonly debounceMs?: number;
}): Promise<boolean> => {
  const fromIdle = nextProjectUpdatedNotifyState("idle", "schedule");
  const fromPending = nextProjectUpdatedNotifyState("pending", "schedule");
  const fromFlushed = nextProjectUpdatedNotifyState("flushed", "schedule");
  if (!fromIdle.ok || !fromPending.ok || !fromFlushed.ok) {
    return false;
  }
  if (input.fields.length === 0) {
    return false;
  }

  const debounceMs = input.debounceMs ?? PROJECT_UPDATED_DEBOUNCE_MS;
  const flushAfter = new Date(input.now.getTime() + debounceMs).toISOString();
  const fields = [...input.fields];
  const actorUserId = input.actorUserId ?? null;
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_updated_notify_pending (
        project_id, state, fields, actor_user_id, flush_after
      )
      VALUES (
        ${input.projectId},
        ${fromIdle.state},
        ${fields},
        ${actorUserId},
        ${flushAfter}::timestamptz
      )
      ON CONFLICT (project_id) DO UPDATE SET
        fields = project_updated_notify_pending.fields || EXCLUDED.fields,
        actor_user_id = COALESCE(
          EXCLUDED.actor_user_id,
          project_updated_notify_pending.actor_user_id
        ),
        flush_after = EXCLUDED.flush_after,
        state = ${fromPending.state},
        updated_at = NOW()
      RETURNING project_id
    `,
  );
  return rows.length > 0;
};
