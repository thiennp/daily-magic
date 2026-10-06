import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { decideHumanInviteTransition } from "@/lib/projects/acl/humanInvites/decideHumanInviteTransition";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";
import { logHumanInviteRevoked } from "@/lib/projects/acl/humanInvites/logHumanInviteActivity";

export type RevokeHumanInviteResult =
  | { readonly ok: true; readonly invite: HumanInviteRecord }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "already_revoked" | "already_redeemed";
    };

export const revokeHumanProjectInvite = async (input: {
  readonly projectId: string;
  readonly inviteId: string;
  readonly ownerUserId: string;
}): Promise<RevokeHumanInviteResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  if (decideHumanInviteTransition({ from: "pending", event: "revoke" }) === null) {
    return { ok: false, code: "already_revoked" };
  }
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_human_invites
      SET revoked_at = NOW()
      WHERE id = ${input.inviteId}
        AND project_id = ${input.projectId}
        AND revoked_at IS NULL
        AND redeemed_at IS NULL
        AND uses_remaining = max_uses
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    const existing = asRowArray(
      await sql`
        SELECT * FROM project_human_invites
        WHERE id = ${input.inviteId} AND project_id = ${input.projectId}
        LIMIT 1
      `,
    );
    if (existing.length === 0) {
      return { ok: false, code: "not_found" };
    }
    const row = existing[0];
    if (row.revoked_at !== null && row.revoked_at !== undefined) {
      return { ok: false, code: "already_revoked" };
    }
    return { ok: false, code: "already_redeemed" };
  }
  const invite = mapHumanInviteRow(rows[0]);
  // Undo already ran out client-side: this call is the commit (F8).
  await logHumanInviteRevoked(invite, input.ownerUserId);
  return { ok: true, invite };
};
