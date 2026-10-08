import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  PROJECT_TASK_TRANSITIONS,
  type ProjectTaskPriority,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** One edit from the detail panel (PATCH body). */
export type ProjectTaskRecordPatch = {
  readonly status?: ProjectTaskStatus;
  readonly priority?: ProjectTaskPriority | null;
  readonly ownerMembershipId?: string | null;
};

/** Current status first, then the moves the status FSM allows. */
export const projectTaskStatusChoices = (
  current: ProjectTaskStatus,
): readonly ProjectTaskStatus[] => [
  current,
  ...PROJECT_TASK_TRANSITIONS[current],
];

/** In-progress work stopped (back to To do) or handed to someone else. */
export const projectTaskChangeNeedsConfirm = (
  task: Pick<ProjectTaskRecord, "status" | "ownerMembershipId">,
  patch: ProjectTaskRecordPatch,
): boolean => {
  if (task.status !== "in_progress") return false;
  if (patch.status === "queued") return true;
  return (
    patch.ownerMembershipId !== undefined &&
    patch.ownerMembershipId !== task.ownerMembershipId
  );
};
