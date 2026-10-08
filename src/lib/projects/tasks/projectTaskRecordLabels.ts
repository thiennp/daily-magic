import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Plain-English status names used in task.updated summaries (bot-facing). */
export const PROJECT_TASK_RECORD_STATUS_LABEL: Record<
  ProjectTaskStatus,
  string
> = {
  queued: "To do",
  planned: "Planned",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
};
