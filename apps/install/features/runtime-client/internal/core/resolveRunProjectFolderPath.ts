export const resolveRunProjectFolderPath = (
  projectFolderPath: string | undefined,
  resolveDefaultProjectFolderPath: () => string,
  projectId?: string,
  /** This profile's linked folder for projectId; used only when the payload has none. */
  linkedProjectFolderPath?: string | null,
): string | null => {
  const trimmedProjectId = projectId?.trim() ?? "";
  const trimmed = projectFolderPath?.trim() ?? "";

  if (trimmedProjectId.length > 0) {
    if (trimmed.length > 0) {
      return trimmed;
    }
    const linked = linkedProjectFolderPath?.trim() ?? "";
    return linked.length > 0 ? linked : null;
  }

  return trimmed.length > 0 ? trimmed : resolveDefaultProjectFolderPath();
};
