import { purgeProjectMembershipData } from "@/lib/projects/acl/purgeProjectMembershipData";
import { revokeProjectApiKeysForMembership } from "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

/** Disable webhooks, revoke project keys, audit leave — mirrors owner revoke side effects. */
export const applyLeaveProjectMembershipSideEffects = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly membership: ProjectMembershipRecord;
}): Promise<void> => {
  await purgeProjectMembershipData({
    projectId: input.projectId,
    membership: input.membership,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "webhook.disable",
    targetUserId: input.membership.userId,
    detail: { membershipId: input.membership.id },
  });
  await revokeProjectApiKeysForMembership({
    projectId: input.projectId,
    membershipId: input.membership.id,
    actorUserId: input.actorUserId,
    targetUserId: input.membership.userId,
  });
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: "leave",
    targetUserId: input.membership.userId,
    detail: { membershipId: input.membership.id },
  });
};
