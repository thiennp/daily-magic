import { mapMembershipRow } from "@/lib/auth/mapGroupRepositoryRow";
import type GroupMembershipRecord from "@/lib/auth/types/GroupMembershipRecord.type";
import { asRowArray, getSql } from "@/lib/db";

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

export async function userOwnsGroupAsSuperAdmin(
  userId: string,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT 1
      FROM group_memberships
      WHERE user_id = ${userId}
        AND role = 'group_super_admin'
      LIMIT 1
    `,
  );

  return result.length > 0;
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
