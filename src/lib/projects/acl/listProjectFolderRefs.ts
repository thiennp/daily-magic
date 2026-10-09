import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectFolderRefRow from "@/lib/projects/acl/mapProjectFolderRefRow";
import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listProjectFolderRefs = async (
  projectId: string,
  /** Set for a member: only folders on computers this user registered. */
  onlyUserId: string | null = null,
): Promise<readonly ProjectFolderRefRecord[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_folder_refs
      WHERE project_id = ${projectId}
        AND (${onlyUserId}::text IS NULL OR machine_or_device_ref IN (
          SELECT id FROM agent_witch_devices WHERE user_id = ${onlyUserId}
        ))
      ORDER BY updated_at DESC
    `,
  );
  return rows.map((row) => mapProjectFolderRefRow(row));
};
