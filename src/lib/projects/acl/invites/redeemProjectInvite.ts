import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import {
  claimProjectInviteToken,
  restoreProjectInviteUse,
} from "@/lib/projects/acl/invites/claimProjectInviteToken";
import { insertRedeemPendingAccessRequest } from "@/lib/projects/acl/invites/insertRedeemPendingAccessRequest";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";

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

export const redeemProjectInvite = async (input: {
  readonly token: string;
  readonly actorUserId: string;
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

  const nameResult = await resolveRedeemSuggestedDisplayName({
    projectId: invite.projectId,
    suggestedProjectDisplayName: input.suggestedProjectDisplayName,
  });
  if (!nameResult.ok) {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: nameResult.code };
  }

  const scopes =
    invite.scopes.length > 0
      ? [...invite.scopes]
      : [...PROJECT_ACL_DEFAULT_MEMBER_SCOPES];
  const inserted = await insertRedeemPendingAccessRequest({
    projectId: invite.projectId,
    actorUserId: input.actorUserId,
    invitedByUserId: invite.createdByUserId,
    inviteId: invite.id,
    teamLabel: invite.teamLabel,
    scopes,
    suggestedName: nameResult.name,
    usesRemaining: invite.usesRemaining,
  });
  if (!inserted.ok) {
    await restoreProjectInviteUse(invite.id);
    return { ok: false, code: "already_pending" };
  }
  return {
    ok: true,
    projectId: invite.projectId,
    request: inserted.request,
    status: "pending",
    namingRequired: true,
    suggestedProjectDisplayName: nameResult.name,
  };
};
