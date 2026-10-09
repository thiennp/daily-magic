"use client";

import { useEffect, useState } from "react";

import { fetchProjectAccess } from "@/features/projects/access/utils/fetchProjectAccess";
import {
  buildProjectTaskSeats,
  type ProjectTaskSeat,
} from "@/features/projects/tasks/utils/buildProjectTaskSeats";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";

const hintFor = (memberKind: string | undefined): string =>
  memberKind === "computer"
    ? ` · ${C.hintAgent}`
    : memberKind === "bot"
      ? ` · ${C.hintAssistant}`
      : "";

/** Active, non-viewer project seats a task can be assigned to. */
export type { ProjectTaskSeat };

export const useProjectTaskSeats = (projectId: string) => {
  const [seats, setSeats] = useState<readonly ProjectTaskSeat[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetchProjectAccess(projectId, controller.signal)
      .then((access) => {
        if (controller.signal.aborted) return;
        setSeats(buildProjectTaskSeats(access.members ?? [], hintFor));
      })
      .catch(() => {
        if (!controller.signal.aborted) setSeats([]);
      });
    return () => {
      controller.abort();
    };
  }, [projectId]);

  return seats;
};
