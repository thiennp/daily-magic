export const resolveRunProjectFolderPath = (
  projectFolderPath: string | undefined,
  resolveDefaultProjectFolderPath: () => string,
): string => {
  const trimmed = projectFolderPath?.trim() ?? "";

  return trimmed.length > 0 ? trimmed : resolveDefaultProjectFolderPath();
};
