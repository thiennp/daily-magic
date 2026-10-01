import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";

export type DeleteProjectFolderRefResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

export const deleteProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly refId: string;
  readonly ownerUserId: string;
}): Promise<DeleteProjectFolderRefResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM project_folder_refs
      WHERE id = ${input.refId}
        AND project_id = ${input.projectId}
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
  return { ok: true };
};
