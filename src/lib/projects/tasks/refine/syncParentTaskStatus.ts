import { deriveParentStatus } from "@agent-witch/shared/taskRefinement";

import { listProjectTaskChildren } from "@/lib/projects/tasks/refine/projectTaskRefinementQueries";
import {
  loadProjectTaskParentId,
  setProjectTaskStatusDerived,
} from "@/lib/projects/tasks/refine/projectTaskStatusSyncQueries";

/**
 * Roll the children's statuses up into the parent (best effort, never throws:
 * a failed roll-up must not undo the child's own change).
 */
export const syncParentTaskStatus = async (input: {
  readonly projectId: string;
  readonly taskId: string;
}): Promise<void> => {
  try {
    const parentId = await loadProjectTaskParentId(input.taskId);
    if (parentId === null) return;
    const children = await listProjectTaskChildren(parentId);
    const derived = deriveParentStatus(children.map((c) => c.status));
    if (derived === null) return;
    await setProjectTaskStatusDerived({
      projectId: input.projectId,
      taskId: parentId,
      status: derived,
    });
  } catch (error: unknown) {
    console.error("parent task roll-up failed", {
      error: error instanceof Error ? error.message : "roll_up_failed",
    });
  }
};
