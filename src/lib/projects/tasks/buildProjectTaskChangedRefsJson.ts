import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Thin task meta for a task.updated message; lets a local agent mirror state. */
export const buildProjectTaskChangedRefsJson = (
  task: Pick<ProjectTaskRecord, "id" | "status" | "priority">,
): string =>
  JSON.stringify({
    taskId: task.id,
    status: task.status,
    ...(task.priority === null ? {} : { priority: String(task.priority) }),
  });
