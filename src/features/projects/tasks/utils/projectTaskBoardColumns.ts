import { PROJECT_TASK_BOARD_COLUMNS } from "@/features/projects/tasks/utils/projectTaskBoard";
import {
  PROJECT_TASK_STATUSES,
  type ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export const PROJECT_TASK_BOARD_HIDDEN_KEY = "awc.taskBoard.hiddenColumns";

/** Stored hidden statuses → known ones only; ignores junk. */
export const parseHiddenBoardColumns = (
  raw: string | null,
): readonly ProjectTaskStatus[] => {
  if (raw === null) return [];
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((v): v is ProjectTaskStatus =>
          (PROJECT_TASK_STATUSES as readonly unknown[]).includes(v),
        )
      : [];
  } catch {
    return [];
  }
};

/** Columns to draw, in board order; the last visible column can't be hidden. */
export const visibleBoardColumns = (
  hidden: readonly ProjectTaskStatus[],
): readonly ProjectTaskStatus[] => {
  const shown = PROJECT_TASK_BOARD_COLUMNS.filter((s) => !hidden.includes(s));
  return shown.length === 0 ? PROJECT_TASK_BOARD_COLUMNS : shown;
};

/** Flip one column; refuses to hide the only visible one. */
export const toggleHiddenBoardColumn = (
  hidden: readonly ProjectTaskStatus[],
  status: ProjectTaskStatus,
): readonly ProjectTaskStatus[] => {
  if (hidden.includes(status)) return hidden.filter((s) => s !== status);
  const next = [...hidden, status];
  return next.length >= PROJECT_TASK_BOARD_COLUMNS.length ? hidden : next;
};
