import type { ProjectTasksChatVisibility } from "@/features/projects/tasks/projectTask.type";

export const PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT: ProjectTasksChatVisibility =
  "tasks_tab_only";

const STORAGE_PREFIX = "awc.tasks.chatVisibility.";

export const projectTasksChatVisibilityStorageKey = (
  projectId: string,
): string => `${STORAGE_PREFIX}${projectId}`;

export const parseProjectTasksChatVisibility = (
  raw: string | null | undefined,
): ProjectTasksChatVisibility => {
  if (raw === "show_in_chat" || raw === "tasks_tab_only" || raw === "compact_chips") {
    return raw;
  }
  return PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT;
};

export const readProjectTasksChatVisibility = (
  projectId: string,
): ProjectTasksChatVisibility => {
  if (typeof window === "undefined") {
    return PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT;
  }
  try {
    return parseProjectTasksChatVisibility(
      window.localStorage.getItem(projectTasksChatVisibilityStorageKey(projectId)),
    );
  } catch {
    return PROJECT_TASKS_CHAT_VISIBILITY_DEFAULT;
  }
};

export const writeProjectTasksChatVisibility = (
  projectId: string,
  value: ProjectTasksChatVisibility,
): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      projectTasksChatVisibilityStorageKey(projectId),
      value,
    );
    window.dispatchEvent(
      new CustomEvent("awc-tasks-chat-visibility", {
        detail: { projectId, value },
      }),
    );
  } catch {
    /* quota / private mode — keep in-memory only */
  }
};
