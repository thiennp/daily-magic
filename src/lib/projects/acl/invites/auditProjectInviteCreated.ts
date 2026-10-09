import { dualWriteProjectInviteAutoApproveEvent } from "@/lib/projects/acl/invites/dualWriteProjectInviteAutoApproveEvent";
import type ProjectInviteRecord from "@/lib/projects/acl/invites/types/ProjectInviteRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/** Access-log rows for a freshly created invite (plus the auto-approve event). */
export const auditProjectInviteCreated = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly invite: ProjectInviteRecord;
}): Promise<void> => {
  const { projectId, actorUserId, invite } = input;
  await writeProjectAccessAudit({
    projectId,
    actorUserId,
    action: "invite.create",
    detail: {
      inviteId: invite.id,
      maxUses: invite.maxUses,
      expiresAt: invite.expiresAt,
      teamLabel: invite.teamLabel,
      autoApprove: invite.autoApprove,
      platform: invite.platform,
    },
  });
  if (!invite.autoApprove) return;
  await writeProjectAccessAudit({
    projectId,
    actorUserId,
    action: "invite.auto_approve_on",
    detail: { inviteId: invite.id, label: invite.id.slice(0, 8) },
  });
  await dualWriteProjectInviteAutoApproveEvent({
    projectId,
    inviteId: invite.id,
    event: "enabled",
    actorUserId,
  });
};
