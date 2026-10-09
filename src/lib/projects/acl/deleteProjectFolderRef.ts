import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { asRowArray, getSql } from "@/lib/db";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";

export type DeleteProjectFolderRefResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

export const deleteProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly refId: string;
  /** The acting user: the owner, or a member removing a folder on their own computer. */
  readonly ownerUserId: string;
}): Promise<DeleteProjectFolderRefResult> => {
  const actor = await resolveFolderRefActor({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!actor.ok) return actor;

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM project_folder_refs
      WHERE id = ${input.refId}
        AND project_id = ${input.projectId}
        AND (${actor.isOwner}::boolean OR machine_or_device_ref IN (
          SELECT id FROM agent_witch_devices WHERE user_id = ${input.ownerUserId}
        ))
      RETURNING id
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "not_found" };
  }
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "remove_folder_ref",
    detail: { folderRefId: input.refId },
  });
  await scheduleProjectUpdatedNotify({
    projectId: input.projectId,
    fields: ["folder_refs"],
    actorUserId: input.ownerUserId,
  });
  return { ok: true };
};
