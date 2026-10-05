import { syncProjectComputerMembership } from "@/lib/projects/acl/syncProjectComputerMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Sole UPDATE writer of user_projects.device_id.
 * Always syncs the computer membership seat (bind / rebind / unbind).
 */
export const setUserProjectLinkedDevice = async (input: {
  readonly ownerUserId: string;
  readonly projectId: string;
  /** null = unbind */
  readonly deviceId: string | null;
  readonly folderPath?: string;
}): Promise<UserProjectRecord | null> => {
  const existing = await getUserProjectById(input.projectId);
  if (existing === null || existing.ownerUserId !== input.ownerUserId) {
    return null;
  }

  const nextDeviceId =
    input.deviceId === null ? null : input.deviceId.trim() || null;
  const nextFolderPath =
    input.folderPath !== undefined ? input.folderPath : existing.folderPath;

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE user_projects
      SET
        device_id = ${nextDeviceId},
        folder_path = ${nextFolderPath},
        updated_at = NOW()
      WHERE id = ${input.projectId}
        AND owner_user_id = ${input.ownerUserId}
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  const project = mapUserProjectRow(rows[0]);
  await syncProjectComputerMembership({
    projectId: input.projectId,
    ownerUserId: input.ownerUserId,
    previousDeviceId: existing.deviceId,
    nextDeviceId: project.deviceId,
  });
  return project;
};
