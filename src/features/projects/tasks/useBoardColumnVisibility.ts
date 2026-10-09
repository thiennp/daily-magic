"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  parseHiddenBoardColumns,
  PROJECT_TASK_BOARD_HIDDEN_KEY,
  toggleHiddenBoardColumn,
  visibleBoardColumns,
} from "@/features/projects/tasks/utils/projectTaskBoardColumns";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

const CHANGE_EVENT = "awc:task-board-columns";

const subscribe = (notify: () => void): (() => void) => {
  window.addEventListener("storage", notify);
  window.addEventListener(CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CHANGE_EVENT, notify);
  };
};

const readRaw = (): string | null => {
  try {
    return window.localStorage.getItem(PROJECT_TASK_BOARD_HIDDEN_KEY);
  } catch {
    return null;
  }
};

/** Which board columns the user hid (remembered in this browser only). */
export const useBoardColumnVisibility = () => {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const hidden = useMemo(() => parseHiddenBoardColumns(raw), [raw]);

  const toggle = useCallback(
    (status: ProjectTaskStatus) => {
      const next = toggleHiddenBoardColumn(hidden, status);
      try {
        window.localStorage.setItem(
          PROJECT_TASK_BOARD_HIDDEN_KEY,
          JSON.stringify(next),
        );
      } catch {
        // not persisted; the change still shows for this visit only if storage works
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    },
    [hidden],
  );

  return { hidden, columns: visibleBoardColumns(hidden), toggle };
};
