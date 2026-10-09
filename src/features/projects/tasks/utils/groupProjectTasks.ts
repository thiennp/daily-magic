import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";

const OPEN_STATUSES: ReadonlySet<ProjectTaskMeta["status"]> = new Set([
  "queued",
  "running",
  "stalled",
]);

/** Tasks still waiting or in flight: the number shown on the Tasks tab. */
export const countOpenProjectTasks = (
  tasks: readonly ProjectTaskMeta[],
): number => tasks.filter((task) => OPEN_STATUSES.has(task.status)).length;

export type ProjectTaskGroup = {
  readonly name: string;
  readonly tasks: readonly ProjectTaskMeta[];
};

const assistantNameOf = (task: ProjectTaskMeta): string =>
  task.assistantName?.trim() || "Assistant";

/** Group by assistant name, groups ordered by first appearance (the list is newest first). */
export const groupProjectTasksByAssistant = (
  tasks: readonly ProjectTaskMeta[],
): readonly ProjectTaskGroup[] => {
  const groups = new Map<string, ProjectTaskMeta[]>();
  for (const task of tasks) {
    const name = assistantNameOf(task);
    groups.set(name, [...(groups.get(name) ?? []), task]);
  }
  return [...groups].map(([name, grouped]) => ({ name, tasks: grouped }));
};
