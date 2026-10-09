import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { resolveFolderRefActor } from "@/lib/projects/acl/resolveFolderRefActor";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import { asRowArray, getSql } from "@/lib/db";

export type SetProjectFolderRefSharedResult =
  | { readonly ok: true; readonly shared: boolean }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/** Owner (any folder) or the member who owns the folder's computer. */
export const setProjectFolderRefShared = async (input: {
  readonly projectId: string;
  readonly refId: string;
  readonly actorUserId: string;
  readonly shared: boolean;
}): Promise<SetProjectFolderRefSharedResult> => {
  const actor = await resolveFolderRefActor({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!actor.ok) return actor;

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_folder_refs
      SET shared = ${input.shared}, updated_at = NOW()
      WHERE id = ${input.refId}
        AND project_id = ${input.projectId}
        AND (${actor.isOwner}::boolean OR machine_or_device_ref IN (
          SELECT id FROM agent_witch_devices WHERE user_id = ${input.actorUserId}
        ))
      RETURNING shared
    `,
  );
  if (rows.length === 0) return { ok: false, code: "not_found" };
  await scheduleProjectUpdatedNotify({
    projectId: input.projectId,
    fields: ["folder_refs"],
    actorUserId: input.actorUserId,
  });
  return { ok: true, shared: input.shared };
};
