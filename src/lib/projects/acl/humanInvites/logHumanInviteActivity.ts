import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/**
 * Access log hooks for human invites. Role only: the invited email is
 * never stored, not even masked. Revoke/remove run from the API call the
 * client sends after its 10s Undo window commits (useDeferredDestructiveAction),
 * and only after the UPDATE succeeded, so an undone action logs nothing.
 */
const inviteDetail = (invite: HumanInviteRecord) => ({
  inviteId: invite.id,
  label: invite.id.slice(0, 8),
  role: invite.role,
});

export const logHumanInviteCreated = (invite: HumanInviteRecord) =>
  writeProjectActivityEvent({
    projectId: invite.projectId,
    type: "human_invite.created",
    actor: { kind: "owner", userId: invite.createdByUserId },
    detail: { ...inviteDetail(invite), expiresAt: invite.expiresAt },
  });

export const logHumanInviteRevoked = (
  invite: HumanInviteRecord,
  ownerUserId: string,
) =>
  writeProjectActivityEvent({
    projectId: invite.projectId,
    type: "human_invite.revoked",
    actor: { kind: "owner", userId: ownerUserId },
    detail: inviteDetail(invite),
  });

export const logHumanInviteAccepted = (settled: {
  readonly invite: HumanInviteRecord;
  readonly membership: ProjectMembershipRecord;
}) =>
  writeProjectActivityEvent({
    projectId: settled.invite.projectId,
    type: "human_invite.accepted",
    actor: {
      kind: "member",
      userId: settled.membership.userId,
      label: settled.membership.projectDisplayName,
    },
    target: {
      membershipId: settled.membership.id,
      userId: settled.membership.userId,
      label: settled.membership.projectDisplayName,
    },
    detail: {
      ...inviteDetail(settled.invite),
      membershipId: settled.membership.id,
      memberKind: "human",
    },
  });

export const logHumanMemberRemoved = (
  membership: ProjectMembershipRecord,
  ownerUserId: string,
) =>
  writeProjectActivityEvent({
    projectId: membership.projectId,
    type: "member.removed",
    actor: { kind: "owner", userId: ownerUserId },
    target: {
      membershipId: membership.id,
      userId: membership.userId,
      label: membership.projectDisplayName,
    },
    detail: {
      membershipId: membership.id,
      memberKind: "human",
      role: membership.role,
    },
  });
