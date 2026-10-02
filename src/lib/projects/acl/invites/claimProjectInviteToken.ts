import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export type ClaimProjectInviteResult =
  | { readonly ok: true; readonly invite: ProjectInviteRecord }
  | { readonly ok: false; readonly code: "invalid_token" };

export const claimProjectInviteToken = async (
  token: string,
): Promise<ClaimProjectInviteResult> => {
  const trimmed = token.trim();
  if (trimmed.length < 16) {
    return { ok: false, code: "invalid_token" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const tokenHash = hashProjectInviteToken(trimmed);
  const claimed = asRowArray(
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining - 1
      WHERE token_hash = ${tokenHash}
        AND revoked_at IS NULL
        AND expires_at > NOW()
        AND uses_remaining > 0
      RETURNING *
    `,
  );
  if (claimed.length === 0) {
    return { ok: false, code: "invalid_token" };
  }
  return { ok: true, invite: mapProjectInviteRow(claimed[0]) };
};

export const restoreProjectInviteUse = async (inviteId: string): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_invites
    SET uses_remaining = uses_remaining + 1
    WHERE id = ${inviteId}
  `;
};
