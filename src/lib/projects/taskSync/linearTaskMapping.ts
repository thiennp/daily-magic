import type {
  ProjectTaskPriority,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export const LINEAR_BLOCKED_LABEL = "Blocked";

export type LinearStateType =
  "triage" | "backlog" | "unstarted" | "started" | "completed" | "canceled";

const STATE_TYPE_BY_STATUS: Readonly<
  Record<ProjectTaskStatus, LinearStateType>
> = {
  queued: "unstarted",
  planned: "backlog",
  in_progress: "started",
  blocked: "started",
  done: "completed",
  cancelled: "canceled",
};

export const linearStateTypeForStatus = (
  status: ProjectTaskStatus,
): LinearStateType => STATE_TYPE_BY_STATUS[status];

/** Linear state type (+ "Blocked" label) → AgentWitch status. */
export const statusFromLinearState = (
  type: string,
  isBlocked: boolean,
): ProjectTaskStatus => {
  if (type === "backlog") return "planned";
  if (type === "started") return isBlocked ? "blocked" : "in_progress";
  if (type === "completed") return "done";
  if (type === "canceled") return "cancelled";
  return "queued";
};

const PRIORITY_BY_LINEAR: Readonly<Record<number, ProjectTaskPriority>> = {
  1: "p0",
  2: "p1",
  3: "p2",
  4: "p3",
};

const LINEAR_BY_PRIORITY: Readonly<Record<ProjectTaskPriority, number>> = {
  p0: 1,
  p1: 2,
  p2: 3,
  p3: 4,
};

export const linearPriorityForTask = (
  priority: ProjectTaskPriority | null,
): number => (priority === null ? 0 : LINEAR_BY_PRIORITY[priority]);

export const priorityFromLinear = (
  value: unknown,
): ProjectTaskPriority | null =>
  typeof value === "number" ? (PRIORITY_BY_LINEAR[value] ?? null) : null;
