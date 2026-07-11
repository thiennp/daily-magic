import { mapMembershipRow } from "@/lib/auth/mapGroupRepositoryRow";
import type { GroupRoleValue } from "@/lib/auth/roles";
import type GroupMembershipRecord from "@/lib/auth/types/GroupMembershipRecord.type";
import { asRowArray, getSql } from "@/lib/db";

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
