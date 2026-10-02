import { revokeProjectApiKeysForMembership } from "@/lib/projects/acl/projectApiKeys/revokeProjectApiKeysForMembership";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getSql } from "@/lib/db";

/** Disable webhooks, revoke project keys, audit leave — mirrors owner revoke side effects. */
export const applyLeaveProjectMembershipSideEffects = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly membership: ProjectMembershipRecord;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE project_membership_webhooks
    SET enabled = FALSE, revoke_generation = revoke_generation + 1, updated_at = NOW()
    WHERE membership_id = ${input.membership.id}
      AND project_id = ${input.projectId}
  `;
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
