import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import { asRowArray, getSql } from "@/lib/db";

export type HumanInviteMissCode =
  | "invalid_token"
  | "expired"
  | "revoked"
  | "already_redeemed";

/** Classify why a claim miss happened (after atomic UPDATE returned 0 rows). */
export const classifyHumanInviteMiss = async (
  token: string,
): Promise<HumanInviteMissCode> => {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return "invalid_token";
  }
  const sql = getSql();
  const tokenHash = hashHumanInviteToken(trimmed);
  const rows = asRowArray(
    await sql`
      SELECT revoked_at, expires_at, uses_remaining, redeemed_at
      FROM project_human_invites
      WHERE token_hash = ${tokenHash}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return "invalid_token";
  }
  const row = rows[0];
  if (row.revoked_at !== null && row.revoked_at !== undefined) {
    return "revoked";
  }
  if (row.redeemed_at !== null && row.redeemed_at !== undefined) {
    return "already_redeemed";
  }
  if (Number(row.uses_remaining) <= 0) {
    return "already_redeemed";
  }
  const expiresAt = new Date(String(row.expires_at)).getTime();
  if (Number.isFinite(expiresAt) && expiresAt <= Date.now()) {
    return "expired";
  }
  return "invalid_token";
};
