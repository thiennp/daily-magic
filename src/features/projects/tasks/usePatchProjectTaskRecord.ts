"use client";

import { useCallback, useState } from "react";

import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import {
  projectTaskChangeNeedsConfirm,
  type ProjectTaskRecordPatch,
} from "@/features/projects/tasks/utils/projectTaskRecordChange";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

const errorText = (status: number): string =>
  status === 409
    ? C.conflictError
    : status === 403
      ? C.forbiddenError
      : C.genericError;

/** PATCH one record: pending flag, server error text, inline confirm step. */
export const usePatchProjectTaskRecord = (input: {
  readonly projectId: string;
  readonly task: ProjectTaskRecord;
  readonly reload: () => void;
}) => {
  const { projectId, task, reload } = input;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<ProjectTaskRecordPatch | null>(
    null,
  );

  const send = useCallback(
    async (patch: ProjectTaskRecordPatch) => {
      setConfirming(null);
      setError(null);
      setPending(true);
      try {
        const res = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/task-records/${encodeURIComponent(task.id)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch),
          },
        );
        if (!res.ok) setError(errorText(res.status));
        reload();
      } catch {
        setError(C.genericError);
      } finally {
        setPending(false);
      }
    },
    [projectId, task.id, reload],
  );

  const request = useCallback(
    (patch: ProjectTaskRecordPatch) => {
      if (projectTaskChangeNeedsConfirm(task, patch)) setConfirming(patch);
      else void send(patch);
    },
    [task, send],
  );

  const cancel = useCallback(() => {
    setConfirming(null);
  }, []);

  return { pending, error, confirming, request, send, cancel };
};
