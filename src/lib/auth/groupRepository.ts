import { isGroupRole, type GroupRoleValue } from "@/lib/auth/roles";
import type GroupMembershipRecord from "@/lib/auth/types/GroupMembershipRecord.type";
import type GroupRecord from "@/lib/auth/types/GroupRecord.type";
import { asRowArray, getSql } from "@/lib/db";

function mapGroupRow(row: Record<string, unknown>): GroupRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    createdAt: String(row.created_at),
  };
}

function mapMembershipRow(row: Record<string, unknown>): GroupMembershipRecord {
  const role = String(row.role);

  return {
    id: String(row.id),
    groupId: String(row.group_id),
    userId: String(row.user_id),
    role: isGroupRole(role) ? role : "user",
    createdAt: String(row.created_at),
  };
}

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

export async function listGroupMemberships(
  groupId: string,
): Promise<readonly GroupMembershipRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, group_id, user_id, role, created_at
      FROM group_memberships
      WHERE group_id = ${groupId}
      ORDER BY created_at ASC
    `,
  );

  return result.map((row) => mapMembershipRow(row));
}

export async function getMembershipForUserInGroup(
  groupId: string,
  userId: string,
): Promise<GroupMembershipRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, group_id, user_id, role, created_at
      FROM group_memberships
      WHERE group_id = ${groupId}
        AND user_id = ${userId}
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapMembershipRow(result[0]);
}

export async function listMembershipsForUser(
  userId: string,
): Promise<readonly GroupMembershipRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, group_id, user_id, role, created_at
      FROM group_memberships
      WHERE user_id = ${userId}
      ORDER BY created_at ASC
    `,
  );

  return result.map((row) => mapMembershipRow(row));
}

export async function addUserToGroup(
  groupId: string,
  userId: string,
  role: GroupRoleValue,
): Promise<GroupMembershipRecord> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      INSERT INTO group_memberships (group_id, user_id, role)
      VALUES (${groupId}, ${userId}, ${role})
      RETURNING id, group_id, user_id, role, created_at
    `,
  );

  return mapMembershipRow(result[0]);
}

export async function updateMembershipRole(
  membershipId: string,
  role: GroupRoleValue,
): Promise<GroupMembershipRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE group_memberships
      SET role = ${role}
      WHERE id = ${membershipId}
      RETURNING id, group_id, user_id, role, created_at
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapMembershipRow(result[0]);
}

export async function removeMembership(membershipId: string): Promise<void> {
  const sql = getSql();
  await sql`DELETE FROM group_memberships WHERE id = ${membershipId}`;
}

export async function countSuperAdminsInGroup(
  groupId: string,
): Promise<number> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS count
      FROM group_memberships
      WHERE group_id = ${groupId}
        AND role = 'group_super_admin'
    `,
  );

  return Number(result[0]?.count ?? 0);
}

export async function getMembershipById(
  membershipId: string,
): Promise<GroupMembershipRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, group_id, user_id, role, created_at
      FROM group_memberships
      WHERE id = ${membershipId}
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapMembershipRow(result[0]);
}
