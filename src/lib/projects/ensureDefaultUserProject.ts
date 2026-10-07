import { DEFAULT_USER_PROJECT_NAME } from "@/lib/projects/defaultUserProject.constants";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";

/**
 * Look up an existing Default project for the owner on this device.
 * Never creates one — join/list/dispatch must not invent Default;
 * users pick or create a named project instead.
 */
export const ensureDefaultUserProject = async (
  ownerUserId: string,
  _profileEmail: string,
  deviceId?: string | null,
): Promise<UserProjectRecord | null> => {
  const linkedDeviceId = deviceId?.trim() ?? "";
  if (linkedDeviceId.length === 0) {
    return null;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM user_projects
      WHERE owner_user_id = ${ownerUserId}
        AND device_id = ${linkedDeviceId}
        AND lower(name) = lower(${DEFAULT_USER_PROJECT_NAME})
      LIMIT 1
    `,
  );

  if (rows.length > 0) {
    return mapUserProjectRow(rows[0]);
  }

  return null;
};
