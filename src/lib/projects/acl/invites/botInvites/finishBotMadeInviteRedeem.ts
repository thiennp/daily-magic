import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import { writeBotInviteRedeemedEvent } from "@/lib/projects/acl/invites/botInvites/writeBotInviteAccessEvents";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import type { RedeemProjectInviteResult } from "@/lib/projects/acl/invites/types/RedeemProjectInviteResult.type";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

type PendingOk = Extract<
  RedeemProjectInviteResult,
  { readonly ok: true; readonly status: "pending" }
>;

/**
 * DF-038 seat step: the verified same-owner redeem is approved on the owner's
 * existing account with approvalSource "bot_invite" (never "owner", so no
 * request.approved row), then logged as "Invited by {inviting bot}". If the
 * approve itself fails, the request stays pending for the owner (normal path).
 */
export const finishBotMadeInviteRedeem = async (input: {
  readonly invite: ProjectInviteRecord;
  readonly ownerUserId: string;
  readonly actorUserId: string;
  readonly inviter: ProjectMembershipRecord;
  readonly scopes: readonly ProjectAclScope[];
  readonly suggestedName: string;
  readonly pendingResult: PendingOk;
}): Promise<RedeemProjectInviteResult> => {
  const { invite } = input;
  const approved = await approveProjectAccessRequest({
    projectId: invite.projectId,
    requestId: input.pendingResult.request.id,
    ownerUserId: input.ownerUserId,
    teamLabel: invite.teamLabel,
    projectDisplayName: input.suggestedName,
    scopes: [...input.scopes],
    approvalSource: "bot_invite",
  });
  if (!approved.ok) return input.pendingResult;
  await writeBotInviteRedeemedEvent({
    projectId: invite.projectId,
    inviteId: invite.id,
    inviter: {
      userId: input.inviter.userId,
      displayName: input.inviter.projectDisplayName,
    },
    membershipId: approved.membership.id,
    memberUserId: input.actorUserId,
    memberDisplayName:
      approved.membership.projectDisplayName ?? input.suggestedName,
  });
  return {
    ok: true,
    projectId: invite.projectId,
    request: approved.request,
    status: "active",
    namingRequired: false,
    suggestedProjectDisplayName: input.suggestedName,
    invitePlatform: invite.platform ?? null,
    membership: approved.membership,
    projectApiKey: approved.projectApiKey,
  };
};
