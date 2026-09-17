import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const updateUserProjectFolderPath = async (
  ownerUserId: string,
  projectId: string,
  folderPath: string,
  deviceId: string,
): Promise<UserProjectRecord | null> => {
  const existing = await getUserProjectById(projectId);

  if (existing === null || existing.ownerUserId !== ownerUserId) {
    return null;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE user_projects
      SET
        folder_path = ${folderPath},
        device_id = ${deviceId},
        updated_at = NOW()
      WHERE id = ${projectId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  return rows.length > 0 ? mapUserProjectRow(rows[0]) : null;
};
