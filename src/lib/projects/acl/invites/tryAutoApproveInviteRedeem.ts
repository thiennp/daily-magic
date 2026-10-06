import { approveProjectAccessRequest } from "@/lib/projects/acl/approveProjectAccessRequest";
import type { RedeemProjectInviteResult } from "@/lib/projects/acl/invites/types/RedeemProjectInviteResult.type";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import { markMembershipAutoApprovedViaInvite } from "@/lib/projects/acl/invites/markMembershipAutoApprovedViaInvite";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

type PendingOk = Extract<
  RedeemProjectInviteResult,
  { readonly ok: true; readonly status: "pending" }
>;

/**
 * When invite autoApprove (claimed bot) or the test flag allows it,
 * approve the pending redeem request and audit invite.auto_approve_redeem.
 */
export const tryAutoApproveInviteRedeem = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly inviteId: string;
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

  const approved = await approveProjectAccessRequest({
    projectId: input.projectId,
    requestId: input.request.id,
    ownerUserId: project.ownerUserId,
    teamLabel: input.teamLabel,
    projectDisplayName: input.suggestedName,
    scopes: [...input.scopes],
  });
  if (!approved.ok) {
    return input.pendingResult;
  }

  const label = input.inviteId.slice(0, 8);
  await markMembershipAutoApprovedViaInvite({
    membershipId: approved.membership.id,
    inviteLabel: label,
  });
  const displayName =
    approved.membership.projectDisplayName ??
    input.suggestedName ??
    "Assistant";
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: project.ownerUserId,
    targetUserId: input.actorUserId,
    action: "invite.auto_approve_redeem",
    detail: {
      inviteId: input.inviteId,
      label,
      membershipId: approved.membership.id,
      projectDisplayName: displayName,
    },
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
