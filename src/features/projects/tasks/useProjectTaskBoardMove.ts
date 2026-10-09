"use client";

import { useCallback, useState } from "react";

import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import { projectTaskChangeNeedsConfirm } from "@/features/projects/tasks/utils/projectTaskRecordChange";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";
import type { ProjectTaskStatus } from "@/lib/projects/tasks/projectTaskTools.constant";

export type BoardMove = {
  readonly task: ProjectTaskRecord;
  readonly to: ProjectTaskStatus;
};

const errorText = (status: number): string =>
  status === 409
    ? C.conflictError
    : status === 403
      ? C.forbiddenError
      : C.genericError;

/** Drag-drop status change: PATCH, reload, and a confirm step for stopping running work. */
export const useProjectTaskBoardMove = (input: {
  readonly projectId: string;
  readonly reload: () => void;
}) => {
  const { projectId, reload } = input;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<BoardMove | null>(null);

  const send = useCallback(
    async (move: BoardMove) => {
      setConfirming(null);
      setError(null);
      setPending(true);
      try {
        const res = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/task-records/${encodeURIComponent(move.task.id)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: move.to }),
          },
        );
        if (!res.ok) setError(errorText(res.status));
      } catch {
        setError(C.genericError);
      } finally {
        setPending(false);
        reload();
      }
    },
    [projectId, reload],
  );

  const move = useCallback(
    (next: BoardMove) => {
      if (projectTaskChangeNeedsConfirm(next.task, { status: next.to })) {
        setConfirming(next);
      } else {
        void send(next);
      }
    },
    [send],
  );

  return {
    pending,
    error,
    confirming,
    move,
    confirm: send,
    cancel: () => setConfirming(null),
  };
};
