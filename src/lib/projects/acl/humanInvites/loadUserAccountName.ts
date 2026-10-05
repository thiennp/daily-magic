import { asRowArray, getSql } from "@/lib/db";

/** Load users.name for display-name derivation on human invite accept. */
export const loadUserAccountName = async (
  userId: string,
): Promise<string | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT name FROM users WHERE id = ${userId} LIMIT 1
    `,
  );
  if (rows.length === 0 || rows[0].name === null || rows[0].name === undefined) {
    return null;
  }
  const name = String(rows[0].name).trim();
  return name.length > 0 ? name : null;
};
