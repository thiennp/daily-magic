import { randomUUID } from "node:crypto";

import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import {
  claimProjectInviteToken,
  restoreProjectInviteUse,
} from "@/lib/projects/acl/invites/claimProjectInviteToken";
import mapProjectAccessRequestRow from "@/lib/projects/acl/mapProjectAccessRequestRow";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
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

export const redeemProjectInvite = async (input: {
  readonly token: string;
  readonly actorUserId: string;
}): Promise<RedeemProjectInviteResult> => {
  const claimed = await claimProjectInviteToken(input.token);
  if (!claimed.ok) {
    return { ok: false, code: "invalid_token" };
  }
  const invite = claimed.invite;
  const membershipStatus = await checkProjectMembershipStatus(
    invite.projectId,
    input.actorUserId,
  );
  if (membershipStatus === "owner") {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "owner" };
  }
  if (membershipStatus === "active") {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "already_member" };
  }
  if (membershipStatus === "pending") {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "already_pending" };
  }

  const scopes =
    invite.scopes.length > 0
      ? [...invite.scopes]
      : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const sql = getSql();
  try {
    const rows = asRowArray(
      await sql`
        INSERT INTO project_access_requests (
          id, project_id, requester_user_id, invited_by_user_id, reason,
          requested_scopes, status, invite_id, team_label
        )
        VALUES (
          ${randomUUID()},
          ${invite.projectId},
          ${input.actorUserId},
          ${invite.createdByUserId},
          ${"invite_redeem"},
          ${scopes},
          'pending',
          ${invite.id},
          ${invite.teamLabel}
        )
        RETURNING *
      `,
    );
    if (rows.length === 0) {
      await restoreProjectInviteUse(invite.id);
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
  } catch {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "already_pending" };
  }
};
