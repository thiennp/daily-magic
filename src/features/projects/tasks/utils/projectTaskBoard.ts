import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import {
  PROJECT_TASK_TRANSITIONS,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

/** Board columns, left to right (work flows rightwards; cancelled is parked last). */
export const PROJECT_TASK_BOARD_COLUMNS: readonly ProjectTaskStatus[] = [
  "queued",
  "planned",
  "in_progress",
  "blocked",
  "done",
  "cancelled",
];

/** Records per column, most recently updated first. */
export const groupProjectTasksForBoard = (
  records: readonly ProjectTaskRecord[],
): Record<ProjectTaskStatus, readonly ProjectTaskRecord[]> => {
  const byStatus = Object.fromEntries(
    PROJECT_TASK_BOARD_COLUMNS.map((status) => [
      status,
      [] as ProjectTaskRecord[],
    ]),
  ) as Record<ProjectTaskStatus, ProjectTaskRecord[]>;
  for (const record of records) byStatus[record.status]?.push(record);
  for (const list of Object.values(byStatus)) {
    list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  return byStatus;
};

/** A card may be dropped on a column only when the status FSM allows the move. */
export const canMoveProjectTask = (
  from: ProjectTaskStatus,
  to: ProjectTaskStatus,
): boolean => from !== to && PROJECT_TASK_TRANSITIONS[from].includes(to);

/** Cards each column shows at first, and how many more each "Show more" adds. */
export const PROJECT_TASK_BOARD_PAGE_SIZE = 10;

/** How many cards of a column are visible after the user asks for more. */
export const nextBoardVisibleCount = (
  current: number | undefined,
  total: number,
): number =>
  Math.min(
    total,
    (current ?? PROJECT_TASK_BOARD_PAGE_SIZE) + PROJECT_TASK_BOARD_PAGE_SIZE,
  );
