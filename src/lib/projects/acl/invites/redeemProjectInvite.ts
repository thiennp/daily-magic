import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import {
  claimProjectInviteToken,
  restoreProjectInviteUse,
} from "@/lib/projects/acl/invites/claimProjectInviteToken";
import { insertRedeemPendingAccessRequest } from "@/lib/projects/acl/invites/insertRedeemPendingAccessRequest";
import { resolveRedeemSuggestedDisplayName } from "@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName";
import { shouldAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/shouldAutoApproveInviteRedeem";
import { tryAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/tryAutoApproveInviteRedeem";
import type { RedeemProjectInviteResult } from "@/lib/projects/acl/invites/types/RedeemProjectInviteResult.type";
import { PROJECT_ACL_DEFAULT_MEMBER_SCOPES } from "@/lib/projects/acl/projectAclScopes.constant";

export type { RedeemProjectInviteResult };

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

  const mayAutoApprove = await shouldAutoApproveInviteRedeem({
    actorUserId: input.actorUserId,
    inviteAutoApprove: invite.autoApprove,
    suggestedDisplayName: nameResult.name,
  });
  if (!mayAutoApprove) {
    return pendingResult;
  }

  return tryAutoApproveInviteRedeem({
    projectId: invite.projectId,
    actorUserId: input.actorUserId,
    inviteId: invite.id,
    teamLabel: invite.teamLabel,
    scopes,
    suggestedName: nameResult.name,
    request: inserted.request,
    pendingResult,
  });
};
