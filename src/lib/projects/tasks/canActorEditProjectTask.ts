import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { canEditProjectTask } from "@/lib/projects/tasks/canEditProjectTask";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/**
 * Edit right incl. the owner's own assistants: a bot member whose agent-access
 * account is claimed by the project owner (DF-038 same-owner proof) acts for
 * the owner and may edit any task. Others fall back to canEditProjectTask.
 */
export const canActorEditProjectTask = async (input: {
  readonly task: Pick<
    ProjectTaskRecord,
    "createdByUserId" | "ownerMembershipId"
  >;
  readonly actorUserId: string;
  readonly ownerUserId: string;
  readonly membership: ProjectMembershipRecord | null;
}): Promise<boolean> => {
  if (
    canEditProjectTask({
      task: input.task,
      actorUserId: input.actorUserId,
      seatId: input.membership?.id ?? null,
    })
  ) {
    return true;
  }
  return (
    (input.membership?.memberKind ?? "bot") === "bot" &&
    (await isBotLinkedToOwnerUser({
      botUserId: input.actorUserId,
      ownerUserId: input.ownerUserId,
    }))
  );
};
