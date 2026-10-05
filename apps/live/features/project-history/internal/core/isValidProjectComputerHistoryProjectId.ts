/**
 * Strict projectId for `<profileDir>/project-data/<projectId>/`.
 * Rejects empty ids, `/`, `\`, `..`, and a leading `.`.
 */
export const isValidProjectComputerHistoryProjectId = (
  projectId: string,
): boolean => {
  if (typeof projectId !== "string") {
    return false;
  }
  const id = projectId.trim();
  if (id.length === 0) {
    return false;
  }
  if (id.startsWith(".")) {
    return false;
  }
  if (id.includes("/") || id.includes("\\") || id.includes("..")) {
    return false;
  }
  return id === projectId;
};
