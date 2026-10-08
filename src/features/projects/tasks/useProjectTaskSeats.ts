"use client";

import { useEffect, useState } from "react";

import { fetchProjectAccess } from "@/features/projects/access/utils/fetchProjectAccess";
import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";

export type ProjectTaskSeat = {
  readonly id: string;
  readonly label: string;
};

const hintFor = (memberKind: string | undefined): string =>
  memberKind === "computer"
    ? ` · ${C.hintAgent}`
    : memberKind === "bot"
      ? ` · ${C.hintAssistant}`
      : "";

/** Active, non-viewer project seats a task can be assigned to. */
export const useProjectTaskSeats = (projectId: string) => {
  const [seats, setSeats] = useState<readonly ProjectTaskSeat[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetchProjectAccess(projectId, controller.signal)
      .then((access) => {
        if (controller.signal.aborted) return;
        setSeats(
          (access.members ?? [])
            .filter(
              (m) =>
                (m.status === undefined || m.status === "active") &&
                m.role !== "viewer" &&
                (m.projectDisplayName?.trim() ?? "").length > 0,
            )
            .map((m) => ({
              id: m.id,
              label: `${m.projectDisplayName?.trim() ?? ""}${hintFor(m.memberKind)}`,
            })),
        );
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
