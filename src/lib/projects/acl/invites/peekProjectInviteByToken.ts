import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export type PeekProjectInviteResult =
  | { readonly ok: true; readonly invite: ProjectInviteRecord }
  | { readonly ok: false };

/** Read invite by token without consuming a use (public instructions page). */
export const peekProjectInviteByToken = async (
  token: string,
): Promise<PeekProjectInviteResult> => {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return { ok: false };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashProjectInviteToken(trimmed);
  const rows = asRowArray(
    await sql`
      SELECT *
      FROM project_invites
      WHERE token_hash = ${tokenHash}
        AND revoked_at IS NULL
        AND expires_at > NOW()
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return { ok: false };
  }
  return { ok: true, invite: mapProjectInviteRow(rows[0]) };
};
