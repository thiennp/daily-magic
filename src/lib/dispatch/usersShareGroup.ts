import { asRowArray, getSql } from "@/lib/db";

export async function usersShareGroup(
  userAId: string,
  userBId: string,
  groupId?: string | null,
): Promise<{ readonly shared: boolean; readonly groupId: string | null }> {
  const sql = getSql();

  if (groupId !== undefined && groupId !== null && groupId.length > 0) {
    const result = asRowArray(
      await sql`
        SELECT gm1.group_id
        FROM group_memberships gm1
        INNER JOIN group_memberships gm2
          ON gm2.group_id = gm1.group_id
        WHERE gm1.user_id = ${userAId}
          AND gm2.user_id = ${userBId}
          AND gm1.group_id = ${groupId}
        LIMIT 1
      `,
    );

    return {
      shared: result.length > 0,
      groupId: result.length > 0 ? groupId : null,
    };
  }

  const result = asRowArray(
    await sql`
      SELECT gm1.group_id
      FROM group_memberships gm1
      INNER JOIN group_memberships gm2
        ON gm2.group_id = gm1.group_id
      WHERE gm1.user_id = ${userAId}
        AND gm2.user_id = ${userBId}
      ORDER BY gm1.created_at ASC
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return { shared: false, groupId: null };
  }

  return { shared: true, groupId: String(result[0].group_id) };
}
