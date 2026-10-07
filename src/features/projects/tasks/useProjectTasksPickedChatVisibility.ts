"use client";

import { useCallback, useState } from "react";

import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import { writeProjectTasksChatVisibility } from "@/features/projects/tasks/projectTasksChatVisibility";
import useProjectTasksChatVisibility from "@/features/projects/tasks/useProjectTasksChatVisibility";

/**
 * Stored value (default on server/hydration, then localStorage). A pick in this
 * view wins for its project even if the write fails (private mode / quota).
 */
export const useProjectTasksPickedChatVisibility = (projectId: string) => {
  const storedChatVisibility = useProjectTasksChatVisibility(projectId);
  const [pickedChatVisibility, setPickedChatVisibility] = useState<{
    readonly projectId: string;
    readonly value: ProjectTasksChatVisibility;
  } | null>(null);
  const chatVisibility =
    pickedChatVisibility !== null && pickedChatVisibility.projectId === projectId
      ? pickedChatVisibility.value
      : storedChatVisibility;

  const setChatVisibility = useCallback(
    (v: ProjectTasksChatVisibility) => {
      setPickedChatVisibility({ projectId, value: v });
      writeProjectTasksChatVisibility(projectId, v);
    },
    [projectId],
  );
  return { chatVisibility, setChatVisibility };
};
