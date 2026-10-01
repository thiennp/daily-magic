import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectFolderRefRow from "@/lib/projects/acl/mapProjectFolderRefRow";
import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listProjectFolderRefs = async (
  projectId: string,
): Promise<readonly ProjectFolderRefRecord[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_folder_refs
      WHERE project_id = ${projectId}
      ORDER BY updated_at DESC
    `,
  );
  return rows.map((row) => mapProjectFolderRefRow(row));
};
