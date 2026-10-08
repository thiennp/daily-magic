import { pushTaskToLinear } from "@/lib/projects/taskSync/pushTaskToLinear";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Who caused the write: AgentWitch users/bots, or the external tracker. */
export type ProjectTaskWriteOrigin = "local" | "linear";

/**
 * The one place every project_task_records writer calls after a successful
 * write. Local writes are pushed to the tracker (best effort, never throws);
 * writes that came FROM the tracker are never pushed back.
 */
export const afterProjectTaskWrite = async (input: {
  readonly task: ProjectTaskRecord;
  readonly origin: ProjectTaskWriteOrigin;
}): Promise<void> => {
  if (input.origin !== "local") return;
  await pushTaskToLinear(input.task);
};
