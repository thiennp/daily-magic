import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type BotFacingProjectTask = Omit<ProjectTaskRecord, "createdByUserId">;

/** Tool results never carry the internal users.id; peers see membership ids. */
export const toBotFacingProjectTask = (
  task: ProjectTaskRecord,
): BotFacingProjectTask =>
  Object.fromEntries(
    Object.entries(task).filter(([key]) => key !== "createdByUserId"),
  ) as BotFacingProjectTask;
