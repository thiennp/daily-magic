import { asRowArray, getSql } from "@/lib/db";

/** True when users.email_verified is set (Google / magic-link verify). */
export const loadUserEmailVerified = async (
  userId: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT email_verified
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0].email_verified != null;
};
