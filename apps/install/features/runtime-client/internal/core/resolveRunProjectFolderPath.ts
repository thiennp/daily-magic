export const resolveRunProjectFolderPath = (
  projectFolderPath: string | undefined,
  resolveDefaultProjectFolderPath: () => string,
  projectId?: string,
): string | null => {
  const trimmedProjectId = projectId?.trim() ?? "";
  const trimmed = projectFolderPath?.trim() ?? "";

  if (trimmedProjectId.length > 0) {
    return trimmed.length > 0 ? trimmed : null;
  }

  return trimmed.length > 0 ? trimmed : resolveDefaultProjectFolderPath();
};
