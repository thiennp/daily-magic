import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/**
 * Owner Approve/Deny of a human email invite → existing request.approved /
 * request.denied Access log types (no new CHECK value). Never the email.
 */
export const logHumanInviteRequestApproved = (input: {
  readonly invite: HumanInviteRecord;
  readonly membership: ProjectMembershipRecord;
  readonly ownerUserId: string;
}) =>
  writeProjectActivityEvent({
    projectId: input.invite.projectId,
    type: "request.approved",
    actor: { kind: "owner", userId: input.ownerUserId },
    target: {
      membershipId: input.membership.id,
      userId: input.membership.userId,
      label: input.membership.projectDisplayName,
    },
    detail: {
      inviteId: input.invite.id,
      membershipId: input.membership.id,
      memberKind: "human",
      role: input.invite.role,
      approvalSource: "owner",
    },
  });

export const logHumanInviteRequestDenied = (input: {
  readonly invite: HumanInviteRecord;
  readonly ownerUserId: string;
}) =>
  writeProjectActivityEvent({
    projectId: input.invite.projectId,
    type: "request.denied",
    actor: { kind: "owner", userId: input.ownerUserId },
    target: {
      userId: input.invite.acceptedByUserId,
      label: input.invite.acceptedDisplayName,
    },
    detail: { inviteId: input.invite.id, memberKind: "human" },
  });
