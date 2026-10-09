const STORAGE_KEY = "agentwitch.library.last-save-project-id.v1";

export const readLastSaveProjectId = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);
  return value !== null && value.trim().length > 0 ? value.trim() : null;
};

export const writeLastSaveProjectId = (projectId: string): void => {
  if (typeof window === "undefined" || projectId.trim().length === 0) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, projectId.trim());
};
