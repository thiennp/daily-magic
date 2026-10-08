import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** list_project_tasks row: Neon task meta only (no bodies, no creator ids). */
export type ProjectTaskListItem = Pick<
  ProjectTaskRecord,
  | "id"
  | "title"
  | "description"
  | "status"
  | "priority"
  | "stage"
  | "ownerMembershipId"
  | "dependsOn"
  | "tipSha"
  | "createdAt"
  | "updatedAt"
> & { readonly ownerProjectDisplayName: string | null };

export const toProjectTaskListItem = (
  task: ProjectTaskRecord,
): ProjectTaskListItem => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  stage: task.stage,
  ownerMembershipId: task.ownerMembershipId,
  ownerProjectDisplayName: task.ownerDisplayName,
  dependsOn: task.dependsOn,
  tipSha: task.tipSha,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
});
