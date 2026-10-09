import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectFolderRefRow from "@/lib/projects/acl/mapProjectFolderRefRow";
import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listProjectFolderRefs = async (
  projectId: string,
  /** Set for a member: folders on their own computers plus folders others shared. */
  onlyUserId: string | null = null,
): Promise<readonly ProjectFolderRefRecord[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT
        pfr.*,
        d.user_id AS device_owner_user_id,
        COALESCE(NULLIF(d.display_name, ''), d.device_label) AS device_name
      FROM project_folder_refs pfr
      LEFT JOIN agent_witch_devices d ON d.id = pfr.machine_or_device_ref
      WHERE pfr.project_id = ${projectId}
        AND (
          ${onlyUserId}::text IS NULL
          OR pfr.shared
          OR d.user_id = ${onlyUserId}
        )
      ORDER BY pfr.updated_at DESC
    `,
  );
  return rows.map((row) => mapProjectFolderRefRow(row));
};
