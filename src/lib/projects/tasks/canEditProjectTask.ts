import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/**
 * Edit right on one task record (after authorizeProjectTaskWriter):
 * project owner (seatId null) → any task, incl. planned items;
 * members / assistants → only tasks they created or that their seat owns.
 */
export const canEditProjectTask = (input: {
  readonly task: Pick<
    ProjectTaskRecord,
    "createdByUserId" | "ownerMembershipId"
  >;
  readonly actorUserId: string;
  readonly seatId: string | null;
}): boolean =>
  input.seatId === null ||
  input.task.createdByUserId === input.actorUserId ||
  input.task.ownerMembershipId === input.seatId;
