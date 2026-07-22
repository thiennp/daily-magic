import { randomUUID } from "node:crypto";

import {
  getUserProjectById,
  listUserProjectsForOwner,
} from "@/lib/projects/userProjectQueries";
import mapUserProjectRow from "@/lib/projects/mapUserProjectRow";
import type { CreateUserProjectInput } from "@/lib/projects/parseUserProjectBody";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const createUserProject = async (
  ownerUserId: string,
  input: CreateUserProjectInput,
): Promise<UserProjectRecord | null> => {
  const projectId = randomUUID();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO user_projects (
        id,
        owner_user_id,
        device_id,
        name,
        folder_path
      )
      VALUES (
        ${projectId},
        ${ownerUserId},
        ${input.deviceId ?? null},
        ${input.name},
        ${input.folderPath}
      )
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapUserProjectRow(rows[0]);
};

export const updateUserProject = async (
  ownerUserId: string,
  projectId: string,
  input: {
    readonly name?: string;
    readonly deviceId?: string | null;
  },
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
        name = ${input.name ?? existing.name},
        device_id = ${
          input.deviceId !== undefined ? input.deviceId : existing.deviceId
        },
        updated_at = NOW()
      WHERE id = ${projectId}
        AND owner_user_id = ${ownerUserId}
      RETURNING *
    `,
  );

  if (rows.length === 0) {
    return null;
  }

  return mapUserProjectRow(rows[0]);
};

export const deleteUserProject = async (
  ownerUserId: string,
  projectId: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM user_projects
      WHERE id = ${projectId}
        AND owner_user_id = ${ownerUserId}
      RETURNING id
    `,
  );

  return rows.length > 0;
};

export const listProjectsForOwner = listUserProjectsForOwner;
