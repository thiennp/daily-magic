import { asRowArray, getSql } from "@/lib/db";

/** Owned assistant (bot) tokens — connect limit counter. */
export const countOwnedAssistantsForUser = async (
  userId: string,
): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS n
      FROM agent_access_tokens
      WHERE owner_user_id = ${userId}
    `,
  );
  return Number(rows[0]?.n ?? 0) || 0;
};
