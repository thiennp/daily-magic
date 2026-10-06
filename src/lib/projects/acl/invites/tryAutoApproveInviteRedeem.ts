import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import type { RedeemProjectInviteResult } from "@/lib/projects/acl/invites/types/RedeemProjectInviteResult.type";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { recordInviteRedeemAutoApproveEffects } from "@/lib/projects/acl/invites/recordInviteRedeemAutoApproveEffects";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

type PendingOk = Extract<
  RedeemProjectInviteResult,
  { readonly ok: true; readonly status: "pending" }
>;

/**
 * Invite autoApprove (claimed bot) or test auto-connect: approve pending redeem.
 * Flag-only uses approvalSource test_auto_connect + Access log (no 073 / badge).
 */
export const tryAutoApproveInviteRedeem = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly inviteId: string;
  /** True only when the invite itself had autoApprove on (not test-flag-only). */
  readonly inviteAutoApprove: boolean;
  readonly teamLabel: string | null;
  readonly scopes: readonly string[];
  readonly suggestedName: string | null;
  readonly request: ProjectAccessRequestRecord;
  readonly pendingResult: PendingOk;
}): Promise<RedeemProjectInviteResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return input.pendingResult;
  }

  const approvalSource = input.inviteAutoApprove
    ? "invite_auto_approve"
    : "test_auto_connect";
  const approved = await approveProjectAccessRequest({
    projectId: input.projectId,
    requestId: input.request.id,
    ownerUserId: project.ownerUserId,
    teamLabel: input.teamLabel,
    projectDisplayName: input.suggestedName,
    scopes: [...input.scopes],
    approvalSource,
  });
  if (!approved.ok) {
    return input.pendingResult;
  }

  const displayName =
    approved.membership.projectDisplayName ??
    input.suggestedName ??
    "Assistant";
  await recordInviteRedeemAutoApproveEffects({
    projectId: input.projectId,
    ownerUserId: project.ownerUserId,
    actorUserId: input.actorUserId,
    inviteId: input.inviteId,
    inviteAutoApprove: input.inviteAutoApprove,
    membershipId: approved.membership.id,
    displayName,
    approvalSource,
  });

  return {
    ok: true,
    projectId: input.projectId,
    request: approved.request,
    status: "active",
    namingRequired: false,
    suggestedProjectDisplayName: input.suggestedName,
    membership: approved.membership,
    projectApiKey: approved.projectApiKey,
  };
};
