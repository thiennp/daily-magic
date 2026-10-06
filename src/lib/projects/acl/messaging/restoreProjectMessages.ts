import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import type { ProjectMessageRestoreTarget } from "@/lib/projects/acl/messaging/parseProjectMessageRestoreTarget";
import { writeProjectMessagesArchiveActivity } from "@/lib/projects/acl/messaging/writeProjectMessagesArchiveActivity";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type RestoreProjectMessagesResult =
  | { readonly ok: true; readonly restoredMessages: number }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Owner-only Restore from Archived: one message, one Clear-all batch (toast
 * Undo), or all. Clears archived_at/archived_by only; never deletes and never
 * re-sends. Writes one Access log row per call.
 */
export const restoreProjectMessages = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly target: ProjectMessageRestoreTarget;
}): Promise<RestoreProjectMessagesResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.actorUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const messageId = input.target.kind === "one" ? input.target.messageId : null;
  const batch =
    input.target.kind === "batch" ? input.target.archiveBatch : null;
  const rows = asRowArray(
    await sql`
      UPDATE project_messages
      SET archived_at = NULL, archived_by = NULL
      WHERE project_id = ${input.projectId}
        AND archived_at IS NOT NULL
        AND (${messageId}::text IS NULL OR id = ${messageId}::text)
        AND (${batch}::timestamptz IS NULL OR archived_at = ${batch}::timestamptz)
      RETURNING id
    `,
  );

  const restoredMessages = rows.length;
  await writeProjectMessagesArchiveActivity({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    type: "messages.restored",
    count: restoredMessages,
  });

  return { ok: true, restoredMessages };
};
