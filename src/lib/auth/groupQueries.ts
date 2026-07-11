import { mapGroupRow } from "@/lib/auth/mapGroupRepositoryRow";
import type GroupRecord from "@/lib/auth/types/GroupRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function listGroups(): Promise<readonly GroupRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, name, created_at
      FROM groups
      ORDER BY created_at DESC
    `,
  );

  return result.map((row) => mapGroupRow(row));
}

export async function listManageableGroupsForUser(
  userId: string,
): Promise<readonly GroupRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT g.id, g.name, g.created_at
      FROM groups g
      INNER JOIN group_memberships gm ON gm.group_id = g.id
      WHERE gm.user_id = ${userId}
        AND gm.role IN ('group_super_admin', 'group_admin')
      ORDER BY g.created_at DESC
    `,
  );

  return result.map((row) => mapGroupRow(row));
}

export async function getGroupById(
  groupId: string,
): Promise<GroupRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, name, created_at
      FROM groups
      WHERE id = ${groupId}
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapGroupRow(result[0]);
}

export async function createGroup(name: string): Promise<GroupRecord> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      INSERT INTO groups (name)
      VALUES (${name})
      RETURNING id, name, created_at
    `,
  );

  return mapGroupRow(result[0]);
}

export async function deleteGroupById(
  groupId: string,
  deleteMembers: boolean,
): Promise<void> {
  const sql = getSql();

  if (deleteMembers) {
    await sql`
      DELETE FROM users
      WHERE id IN (
        SELECT user_id
        FROM group_memberships
        WHERE group_id = ${groupId}
      )
    `;
  }

  await sql`DELETE FROM groups WHERE id = ${groupId}`;
}
