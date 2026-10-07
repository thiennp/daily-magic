"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";
import {
  PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT,
  projectTasksChatVisibilityStorageKey,
  readProjectTasksChatVisibility,
} from "@/features/projects/tasks/projectTasksChatVisibility";

const readServerSnapshot = (): ProjectTasksChatVisibility =>
  PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT;

/**
 * Live preference for Messenger AI-session chips (default: Tasks tab only).
 * External store over localStorage: server/hydration render = default, then the
 * stored value; same-tab writes (custom event) and other tabs (storage) re-read.
 */
export default function useProjectTasksChatVisibility(
  projectId: string,
): ProjectTasksChatVisibility {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const onCustom = (ev: Event): void => {
        const detail = (ev as CustomEvent<{ projectId: string }>).detail;
        if (detail?.projectId === projectId) onChange();
      };
      const onStorage = (ev: StorageEvent): void => {
        if (ev.key === projectTasksChatVisibilityStorageKey(projectId)) onChange();
      };
      window.addEventListener("awc-tasks-chat-visibility", onCustom);
      window.addEventListener("storage", onStorage);
      return () => {
        window.removeEventListener("awc-tasks-chat-visibility", onCustom);
        window.removeEventListener("storage", onStorage);
      };
    },
    [projectId],
  );
  const readSnapshot = useCallback(
    () => readProjectTasksChatVisibility(projectId),
    [projectId],
  );
  return useSyncExternalStore(subscribe, readSnapshot, readServerSnapshot);
}
