import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  claimProjectInviteToken,
  restoreProjectInviteUse,
} from "@/lib/projects/acl/invites/claimProjectInviteToken";
import { insertRedeemPendingAccessRequest } from "@/lib/projects/acl/invites/insertRedeemPendingAccessRequest";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type RedeemProjectInviteResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly request: ProjectAccessRequestRecord;
      readonly status: "pending";
      readonly namingRequired: true;
      readonly suggestedProjectDisplayName: string | null;
      readonly membership?: undefined;
      readonly projectApiKey?: undefined;
    }
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly request: ProjectAccessRequestRecord;
      readonly status: "active";
      readonly namingRequired: false;
      readonly suggestedProjectDisplayName: string | null;
      readonly membership: ProjectMembershipRecord;
      readonly projectApiKey: string | null;
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

/**
 * Softvale-fast invite-as-consent: successful redeem with a usable display
 * name auto-finalizes active membership (owner issued the invite).
 * Agents without suggestedProjectDisplayName stay pending (naming required).
 */
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

  const requesterIsAgent = await isAgentUserId(input.actorUserId);
  const canAutoApprove =
    !requesterIsAgent || nameResult.name !== null;
  if (!canAutoApprove) {
    return {
      ok: true,
      projectId: invite.projectId,
      request: inserted.request,
      status: "pending",
      namingRequired: true,
      suggestedProjectDisplayName: nameResult.name,
    };
  }

  const project = await getUserProjectById(invite.projectId);
  if (project === null) {
    return {
      ok: true,
      projectId: invite.projectId,
      request: inserted.request,
      status: "pending",
      namingRequired: true,
      suggestedProjectDisplayName: nameResult.name,
    };
  }

  const approved = await approveProjectAccessRequest({
    projectId: invite.projectId,
    requestId: inserted.request.id,
    ownerUserId: project.ownerUserId,
    teamLabel: invite.teamLabel,
    projectDisplayName: nameResult.name,
    scopes,
  });
  if (!approved.ok) {
    // Leave pending for owner Approve (e.g. race on display name).
    return {
      ok: true,
      projectId: invite.projectId,
      request: inserted.request,
      status: "pending",
      namingRequired: true,
      suggestedProjectDisplayName: nameResult.name,
    };
  }

  return {
    ok: true,
    projectId: invite.projectId,
    request: approved.request,
    status: "active",
    namingRequired: false,
    suggestedProjectDisplayName: nameResult.name,
    membership: approved.membership,
    projectApiKey: approved.projectApiKey,
  };
};
