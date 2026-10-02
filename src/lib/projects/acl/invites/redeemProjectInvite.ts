import { randomUUID } from "node:crypto";

import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { hashProjectInviteToken } from "@/lib/projects/acl/invites/hashProjectInviteToken";
import mapProjectInviteRow from "@/lib/projects/acl/invites/mapProjectInviteRow";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { asRowArray, getSql } from "@/lib/db";

export type RedeemProjectInviteResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly request: ProjectAccessRequestRecord;
      readonly status: "pending";
      readonly namingRequired: true;
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_token"
        | "already_member"
        | "already_pending"
        | "owner"
        | "exhausted";
    };

/**
 * Redeem invite → pending access request (UI contract).
 * No scoped key until owner Approve + projectDisplayName.
 * Atomic uses_remaining claim (A1.4).
 */
export const redeemProjectInvite = async (input: {
  readonly token: string;
  readonly actorUserId: string;
}): Promise<RedeemProjectInviteResult> => {
  const token = input.token.trim();
  if (token.length < 16) {
    return { ok: false, code: "invalid_token" };
  }
  const tokenHash = hashProjectInviteToken(token);
  await ensureProjectAclSchema();
  const sql = getSql();

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
  const invite = mapProjectInviteRow(claimed[0]);

  const membershipStatus = await checkProjectMembershipStatus(
    invite.projectId,
    input.actorUserId,
  );
  if (membershipStatus === "owner") {
    // Restore use — owner should not burn invite.
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining + 1
      WHERE id = ${invite.id}
    `;
    return { ok: false, code: "owner" };
  }
  if (membershipStatus === "active") {
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining + 1
      WHERE id = ${invite.id}
    `;
    return { ok: false, code: "already_member" };
  }
  if (membershipStatus === "pending") {
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining + 1
      WHERE id = ${invite.id}
    `;
    return { ok: false, code: "already_pending" };
  }

  const scopes =
    invite.scopes.length > 0
      ? [...invite.scopes]
      : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const requestId = randomUUID();
  const reason = "invite_redeem";
  let rows: Record<string, unknown>[] = [];
  try {
    rows = asRowArray(
      await sql`
        INSERT INTO project_access_requests (
          id, project_id, requester_user_id, invited_by_user_id, reason,
          requested_scopes, status, invite_id, team_label
        )
        VALUES (
          ${requestId},
          ${invite.projectId},
          ${input.actorUserId},
          ${invite.createdByUserId},
          ${reason},
          ${scopes},
          'pending',
          ${invite.id},
          ${invite.teamLabel}
        )
        RETURNING *
      `,
    );
  } catch {
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining + 1
      WHERE id = ${invite.id}
    `;
    return { ok: false, code: "already_pending" };
  }
  if (rows.length === 0) {
    await sql`
      UPDATE project_invites
      SET uses_remaining = uses_remaining + 1
      WHERE id = ${invite.id}
    `;
    return { ok: false, code: "already_pending" };
  }

  const request = mapProjectAccessRequestRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: invite.projectId,
    actorUserId: input.actorUserId,
    action: "invite.redeem",
    targetUserId: input.actorUserId,
    detail: {
      inviteId: invite.id,
      requestId: request.id,
      usesRemaining: invite.usesRemaining,
    },
  });
  return {
    ok: true,
    projectId: invite.projectId,
    request,
    status: "pending",
    namingRequired: true,
  };
};
