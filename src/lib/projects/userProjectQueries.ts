import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const listUserProjectsForOwner = async (
  ownerUserId: string,
  deviceId?: string | null,
): Promise<readonly UserProjectRecord[]> => {
  const sql = getSql();
  const rows =
    deviceId !== undefined && deviceId !== null && deviceId.length > 0
      ? asRowArray(
          await sql`
            SELECT *
            FROM user_projects
            WHERE owner_user_id = ${ownerUserId}
              AND device_id = ${deviceId}
            ORDER BY last_used_at DESC NULLS LAST, created_at DESC
          `,
        )
      : asRowArray(
          await sql`
            SELECT *
            FROM user_projects
            WHERE owner_user_id = ${ownerUserId}
            ORDER BY last_used_at DESC NULLS LAST, created_at DESC
          `,
        );

  return rows.map((row) => mapUserProjectRow(row));
};

export const getUserProjectById = async (
  projectId: string,
): Promise<UserProjectRecord | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM user_projects
      WHERE id = ${projectId}
      LIMIT 1
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapUserProjectRow(rows[0]);
};

export const touchUserProjectLastUsed = async (
  projectId: string,
  ownerUserId: string,
): Promise<void> => {
  const sql = getSql();

  await sql`
    UPDATE user_projects
    SET last_used_at = NOW(), updated_at = NOW()
    WHERE id = ${projectId}
      AND owner_user_id = ${ownerUserId}
  `;
};

/** Projects the user joined (active membership) but does not own. */
export const listUserProjectsForMember = async (
  userId: string,
): Promise<readonly UserProjectRecord[]> => {
  const rows = asRowArray(
    await getSql()`
      SELECT up.*
      FROM user_projects up
      INNER JOIN project_memberships m ON m.project_id = up.id
      WHERE m.user_id = ${userId}
        AND m.status = 'active'
        AND up.owner_user_id <> ${userId}
      ORDER BY m.created_at DESC
    `,
  );
  return rows.map((row) => mapUserProjectRow(row));
};
