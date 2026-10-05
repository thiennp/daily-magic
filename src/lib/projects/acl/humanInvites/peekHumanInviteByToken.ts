import { hashHumanInviteToken } from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

/** Read invite by token hash (no mutation). Used to pre-check owner/member. */
export const peekHumanInviteByToken = async (
  token: string,
): Promise<HumanInviteRecord | null> => {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return null;
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashHumanInviteToken(trimmed);
  const rows = asRowArray(
    await sql`
      SELECT * FROM project_human_invites
      WHERE token_hash = ${tokenHash}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return null;
  }
  return mapHumanInviteRow(rows[0]);
};
