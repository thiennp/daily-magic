"use client";

import { PROJECT_TASK_BOARD_COPY as B } from "@/features/projects/tasks/projectTaskBoardCopy.constant";
import { useCallback, useState } from "react";

import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";
import type {
  ProjectTaskPriority,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export type NewProjectTask = {
  readonly title: string;
  readonly description: string;
  readonly priority: ProjectTaskPriority | null;
  readonly status: Extract<ProjectTaskStatus, "queued" | "planned">;
  readonly ownerMembershipId: string | null;
};

const errorText = (status: number): string =>
  status === 409
    ? B.createCapError
    : status === 429
      ? B.createRateError
      : status === 403
        ? C.forbiddenError
        : C.genericError;

/** POST a new task record, then reload the list. */
export const useCreateProjectTask = (input: {
  readonly projectId: string;
  readonly reload: () => void;
}) => {
  const { projectId, reload } = input;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (task: NewProjectTask): Promise<boolean> => {
      setPending(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/task-records`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: task.title,
              status: task.status,
              ...(task.description.trim() !== "" && {
                description: task.description,
              }),
              ...(task.priority !== null && { priority: task.priority }),
              ...(task.ownerMembershipId !== null && {
                ownerMembershipId: task.ownerMembershipId,
              }),
            }),
          },
        );
        if (!res.ok) {
          setError(errorText(res.status));
          return false;
        }
        reload();
        return true;
      } catch {
        setError(C.genericError);
        return false;
      } finally {
        setPending(false);
      }
    },
    [projectId, reload],
  );

  return { pending, error, create, clearError: () => setError(null) };
};
