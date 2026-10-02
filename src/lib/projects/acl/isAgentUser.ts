import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { asRowArray, getSql } from "@/lib/db";

export const isAgentUserId = async (userId: string): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT email FROM users WHERE id = ${userId} LIMIT 1
    `,
  );
  if (rows.length === 0 || typeof rows[0].email !== "string") {
    return false;
  }
  return isAgentAccessSyntheticEmail(rows[0].email);
};

export type UserProfileLite = {
  readonly id: string;
  readonly email: string | null;
  readonly name: string | null;
  readonly image: string | null;
  readonly isAgent: boolean;
};

export const loadUserProfilesByIds = async (
  userIds: readonly string[],
): Promise<Map<string, UserProfileLite>> => {
  const map = new Map<string, UserProfileLite>();
  if (userIds.length === 0) {
    return map;
  }
  const sql = getSql();
  const ids = [...userIds];
  const rows = asRowArray(
    await sql`
      SELECT id, email, name, image
      FROM users
      WHERE id = ANY(${ids})
    `,
  );
  for (const row of rows) {
    const id = String(row.id);
    const email = row.email ? String(row.email) : null;
    map.set(id, {
      id,
      email,
      name: row.name ? String(row.name) : null,
      image: row.image ? String(row.image) : null,
      isAgent: email !== null && isAgentAccessSyntheticEmail(email),
    });
  }
  return map;
};
