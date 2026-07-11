import { mapGroupRow } from "@/lib/auth/mapGroupRepositoryRow";
import type GroupRecord from "@/lib/auth/types/GroupRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function listGroupsForMember(
  userId: string,
): Promise<readonly GroupRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT g.id, g.name, g.dispatch_policy, g.created_at
      FROM groups g
      INNER JOIN group_memberships gm ON gm.group_id = g.id
      WHERE gm.user_id = ${userId}
      ORDER BY g.created_at DESC
    `,
  );

  return result.map((row) => mapGroupRow(row));
}
