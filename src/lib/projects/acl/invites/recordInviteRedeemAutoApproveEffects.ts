import { dualWriteProjectInviteAutoApproveEvent } from "@/lib/projects/acl/invites/dualWriteProjectInviteAutoApproveEvent";
import { markMembershipAutoApprovedViaInvite } from "@/lib/projects/acl/invites/markMembershipAutoApprovedViaInvite";
import { writeTestAutoConnectAccessEvent } from "@/lib/projects/acl/invites/writeTestAutoConnectAccessEvent";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import type { ProjectApprovalSource } from "@/lib/projects/acl/activity/projectActivityEvent.constant";

export const recordInviteRedeemAutoApproveEffects = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly actorUserId: string;
  readonly inviteId: string;
  readonly inviteAutoApprove: boolean;
  readonly membershipId: string;
  readonly displayName: string;
  readonly approvalSource: ProjectApprovalSource;
}): Promise<void> => {
  const label = input.inviteId.slice(0, 8);
  if (input.inviteAutoApprove) {
    await markMembershipAutoApprovedViaInvite({
      membershipId: input.membershipId,
      inviteLabel: label,
    });
    await dualWriteProjectInviteAutoApproveEvent({
      projectId: input.projectId,
      inviteId: input.inviteId,
      event: "member_auto_approved",
      actorUserId: input.ownerUserId,
      membershipId: input.membershipId,
      memberDisplayName: input.displayName,
      memberUserId: input.actorUserId,
    });
  } else {
    await writeTestAutoConnectAccessEvent({
      projectId: input.projectId,
      inviteId: input.inviteId,
      membershipId: input.membershipId,
      memberUserId: input.actorUserId,
      memberDisplayName: input.displayName,
    });
  }
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    targetUserId: input.actorUserId,
    action: "invite.auto_approve_redeem",
    detail: {
      inviteId: input.inviteId,
      label,
      membershipId: input.membershipId,
      projectDisplayName: input.displayName,
      approvalSource: input.approvalSource,
    },
  });
};
