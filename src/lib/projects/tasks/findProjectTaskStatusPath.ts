import {
  PROJECT_TASK_TRANSITIONS,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/**
 * Shortest chain of FSM-valid moves from → to (excluding `from`), found by
 * breadth-first search over PROJECT_TASK_TRANSITIONS. [] when equal, null when
 * unreachable.
 */
export const findProjectTaskStatusPath = (
  from: ProjectTaskStatus,
  to: ProjectTaskStatus,
): readonly ProjectTaskStatus[] | null => {
  if (from === to) return [];
  const seen = new Set<ProjectTaskStatus>([from]);
  const queue: (readonly ProjectTaskStatus[])[] = [[from]];
  for (const path of queue) {
    const last = path[path.length - 1];
    for (const next of PROJECT_TASK_TRANSITIONS[last]) {
      if (seen.has(next)) continue;
      if (next === to) return [...path.slice(1), next];
      seen.add(next);
      queue.push([...path, next]);
    }
  }
  return null;
};
