import { mintProjectApiKey } from "@/lib/projects/acl/projectApiKeys/mintProjectApiKey";
import type ProjectAccessRequestRecord from "@/lib/projects/acl/types/ProjectAccessRequestRecord.type";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export const finalizeApprovedMembership = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly request: ProjectAccessRequestRecord;
  readonly membership: ProjectMembershipRecord;
  readonly displayName: string | null;
  readonly mintKey: boolean;
}): Promise<string | null> => {
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "approve",
    targetUserId: input.request.requesterUserId,
    detail: {
      requestId: input.request.id,
      membershipId: input.membership.id,
      projectDisplayName: input.displayName,
    },
  });
  if (input.displayName !== null) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.ownerUserId,
      action: "membership.set_display_name",
      targetUserId: input.request.requesterUserId,
      detail: {
        membershipId: input.membership.id,
        projectDisplayName: input.displayName,
      },
    });
  }
  if (!input.mintKey) {
    return null;
  }
  const minted = await mintProjectApiKey({
    projectId: input.projectId,
    membershipId: input.membership.id,
    userId: input.membership.userId,
    scopes: input.membership.scopes,
    actorUserId: input.ownerUserId,
    auditAction: "key.mint",
  });
  return minted.plaintext;
};
