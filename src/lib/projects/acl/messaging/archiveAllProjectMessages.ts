import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { writeProjectMessagesArchiveActivity } from "@/lib/projects/acl/messaging/writeProjectMessagesArchiveActivity";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type ArchiveAllProjectMessagesResult =
  | {
      readonly ok: true;
      readonly archivedMessages: number;
      /** archived_at of this batch (exact text); Undo restores only these rows. */
      readonly archiveBatch: string | null;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "confirm_required";
    };

/**
 * Owner-only Inbox Clear all → archive (CLEAR-ALL-LOCK.md).
 * Stamps archived_at + archived_by on every not-yet-archived project_messages
 * row. No DELETE, no CASCADE: deliveries, memberships and webhook
 * registrations are untouched, and the row count never changes.
 * Archived rows leave the Inbox for everyone and stay readable under
 * Archived; they no longer count as unread or pending delivery.
 */
export const archiveAllProjectMessages = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly confirm: boolean;
}): Promise<ArchiveAllProjectMessagesResult> => {
  if (input.confirm !== true) {
    return { ok: false, code: "confirm_required" };
  }

  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_messages
      SET archived_at = NOW(), archived_by = ${input.actorUserId}
      WHERE project_id = ${input.projectId}
        AND archived_at IS NULL
      RETURNING id, archived_at::text AS archive_batch
    `,
  );

  const archivedMessages = rows.length;
  const batch = rows[0]?.archive_batch;
  const archiveBatch =
    typeof batch === "string" && batch.length > 0 ? batch : null;

  await writeProjectMessagesArchiveActivity({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    type: "messages.archived",
    count: archivedMessages,
  });

  return { ok: true, archivedMessages, archiveBatch };
};
