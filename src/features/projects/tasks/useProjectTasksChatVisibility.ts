"use client";

import { useEffect, useState } from "react";

import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import {
  PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT,
  readProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTasksChatVisibility";

/** Live preference for Messenger AI-session chips (default: Tasks tab only). */
export default function useProjectTasksChatVisibility(
  projectId: string,
): ProjectTasksChatVisibility {
  const [value, setValue] = useState<ProjectTasksChatVisibility>(
    PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT,
  );
  useEffect(() => {
    setValue(readProjectTasksChatVisibility(projectId));
    const onCustom = (ev: Event): void => {
      const detail = (ev as CustomEvent<{ projectId: string; value: ProjectTasksChatVisibility }>).detail;
      if (detail?.projectId === projectId) setValue(detail.value);
    };
    const onStorage = (ev: StorageEvent): void => {
      if (ev.key === `awc.tasks.chatVisibility.${projectId}`) {
        setValue(readProjectTasksChatVisibility(projectId));
      }
    };
    window.addEventListener("awc-tasks-chat-visibility", onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("awc-tasks-chat-visibility", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [projectId]);
  return value;
}
