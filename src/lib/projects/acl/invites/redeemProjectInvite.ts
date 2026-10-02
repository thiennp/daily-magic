import { randomUUID } from "node:crypto";

import { isProjectDisplayNameTaken } from "@/lib/projects/acl/displayNames/isProjectDisplayNameTaken";
import { validateProjectDisplayName } from "@/lib/projects/acl/displayNames/normalizeProjectDisplayName";
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
      readonly suggestedProjectDisplayName: string | null;
    }
  | {
      readonly ok: false;
      readonly code:
        | "invalid_token"
        | "already_member"
        | "already_pending"
        | "owner"
        | "exhausted"
        | "display_name_invalid"
        | "display_name_reserved"
        | "display_name_required"
        | "display_name_taken";
    };

const mapValidationFail = (
  code: "missing" | "invalid" | "reserved" | "too_long" | "too_short",
): Extract<RedeemProjectInviteResult, { ok: false }>["code"] => {
  if (code === "reserved") return "display_name_reserved";
  if (code === "missing") return "display_name_required";
  return "display_name_invalid";
};

export const redeemProjectInvite = async (input: {
  readonly token: string;
  readonly actorUserId: string;
  /** Optional unique nickname suggestion; rejected if invalid/taken. */
  readonly suggestedProjectDisplayName?: string | null;
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

  let suggestedName: string | null = null;
  const rawSuggestion = input.suggestedProjectDisplayName;
  if (
    rawSuggestion !== undefined &&
    rawSuggestion !== null &&
    String(rawSuggestion).trim().length > 0
  ) {
    const validated = validateProjectDisplayName(rawSuggestion);
    if (!validated.ok) {
      await restoreProjectInviteUse(invite.id);
      return { ok: false, code: mapValidationFail(validated.code) };
    }
    const taken = await isProjectDisplayNameTaken({
      projectId: invite.projectId,
      displayNameKey: validated.key,
      softCheckPending: true,
    });
    if (taken) {
      await restoreProjectInviteUse(invite.id);
      return { ok: false, code: "display_name_taken" };
    }
    suggestedName = validated.name;
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
          requested_scopes, status, invite_id, team_label,
          suggested_project_display_name
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
          ${invite.teamLabel},
          ${suggestedName}
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
        suggestedProjectDisplayName: suggestedName,
      },
    });
    return {
      ok: true,
      projectId: invite.projectId,
      request,
      status: "pending",
      namingRequired: true,
      suggestedProjectDisplayName: suggestedName,
    };
  } catch {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "already_pending" };
  }
};
