import {
  DEFAULT_USER_PROJECT_NAME,
  buildDefaultUserProjectFolderPath,
} from "@/lib/projects/defaultUserProject.constants";
import { createUserProject } from "@/lib/projects/userProjectMutations";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";

export const ensureDefaultUserProject = async (
  ownerUserId: string,
  deviceId?: string | null,
): Promise<UserProjectRecord> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM user_projects
      WHERE owner_user_id = ${ownerUserId}
        AND lower(name) = lower(${DEFAULT_USER_PROJECT_NAME})
      LIMIT 1
    `,
  );

  if (rows.length > 0) {
    return mapUserProjectRow(rows[0]);
  }

  const created = await createUserProject(ownerUserId, {
    name: DEFAULT_USER_PROJECT_NAME,
    folderPath: buildDefaultUserProjectFolderPath(),
    deviceId: deviceId ?? null,
  });

  if (created === null) {
    throw new Error("Could not create the default project.");
  }

  return created;
};
