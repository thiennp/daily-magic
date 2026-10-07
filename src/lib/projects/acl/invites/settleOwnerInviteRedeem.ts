import { shouldAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/shouldAutoApproveInviteRedeem";
import { tryAutoApproveInviteRedeem } from "@/lib/projects/acl/invites/tryAutoApproveInviteRedeem";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import type { RedeemProjectInviteResult } from "@/lib/projects/acl/invites/types/RedeemProjectInviteResult.type";
import type { ProjectAclScope } from "@/lib/projects/acl/projectAclScopes.constant";

type PendingOk = Extract<
  RedeemProjectInviteResult,
  { readonly ok: true; readonly status: "pending" }
>;

/**
 * Owner-made invite tail (moved verbatim out of redeemProjectInvite, DF-038):
 * stays pending unless the owner's per-invite auto-approve checkbox (claimed
 * bot) or the non-production test auto-connect flag allows approve.
 */
export const settleOwnerInviteRedeem = async (input: {
  readonly invite: ProjectInviteRecord;
  readonly actorUserId: string;
  readonly scopes: readonly ProjectAclScope[];
  readonly suggestedName: string | null;
  readonly pendingResult: PendingOk;
}): Promise<RedeemProjectInviteResult> => {
  const { invite, pendingResult } = input;
  const mayAutoApprove = await shouldAutoApproveInviteRedeem({
    actorUserId: input.actorUserId,
    inviteAutoApprove: invite.autoApprove,
    suggestedDisplayName: input.suggestedName,
  });
  if (!mayAutoApprove) {
    return pendingResult;
  }

  const finished = await tryAutoApproveInviteRedeem({
    projectId: invite.projectId,
    actorUserId: input.actorUserId,
    inviteId: invite.id,
    inviteAutoApprove: invite.autoApprove,
    teamLabel: invite.teamLabel,
    scopes: input.scopes,
    suggestedName: input.suggestedName,
    request: pendingResult.request,
    pendingResult,
  });
  return finished.ok
    ? { ...finished, invitePlatform: invite.platform ?? null }
    : finished;
};
