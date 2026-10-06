import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  claimProjectInviteToken,
  restoreProjectInviteUse,
} from "@/lib/projects/acl/invites/claimProjectInviteToken";
import { insertRedeemPendingAccessRequest } from "@/lib/projects/acl/invites/insertRedeemPendingAccessRequest";
import { isAwcTestAutoApproveJoinsEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoApproveJoinsEnabled";
import { resolveAgentLinkedOwnerUserId } from "@/lib/agentAccess/resolveAgentLinkedOwnerUserId";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
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
 * Redeem always inserts a pending request first.
 * Auto-approve only when the invite has autoApprove on (owner opt-in)
 * AND the redeeming bot is claimed (linked owner_user_id), or when
 * AWC_TEST_AUTO_APPROVE_JOINS is enabled outside production.
 * Agents still need a suggested display name to auto-approve.
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

  const pendingResult = {
    ok: true as const,
    projectId: invite.projectId,
    request: inserted.request,
    status: "pending" as const,
    namingRequired: true as const,
    suggestedProjectDisplayName: nameResult.name,
  };

  const requesterIsAgent = await isAgentUserId(input.actorUserId);
  const hasName = nameResult.name !== null;
  const testOverride = isAwcTestAutoApproveJoinsEnabled();
  // Invite autoApprove applies only to claimed bots (linked owner_user_id).
  const linkedOwnerId = requesterIsAgent
    ? await resolveAgentLinkedOwnerUserId(input.actorUserId)
    : input.actorUserId;
  const inviteAutoApproveAllowed =
    invite.autoApprove && linkedOwnerId !== null;
  const mayAutoApprove =
    (inviteAutoApproveAllowed || testOverride) &&
    (!requesterIsAgent || hasName);
  if (!mayAutoApprove) {
    return pendingResult;
  }

  const project = await getUserProjectById(invite.projectId);
  if (project === null) {
    return pendingResult;
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
    return pendingResult;
  }

  const label = invite.id.slice(0, 8);
  const displayName =
    approved.membership.projectDisplayName ?? nameResult.name ?? "Assistant";
  await writeProjectAccessAudit({
    projectId: invite.projectId,
    actorUserId: project.ownerUserId,
    targetUserId: input.actorUserId,
    action: "invite.auto_approve_redeem",
    detail: {
      inviteId: invite.id,
      label,
      membershipId: approved.membership.id,
      projectDisplayName: displayName,
    },
  });

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
