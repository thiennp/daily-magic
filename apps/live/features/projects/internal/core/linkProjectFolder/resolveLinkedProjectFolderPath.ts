import { readLinkedProjectFolders } from "./linkedProjectFoldersFile";

/** Folder this profile linked for a project; null when none (caller still runs the allowlist). */
export const resolveLinkedProjectFolderPath = (
  profileDir: string,
  projectId: string | undefined,
): string | null => {
  const wanted = projectId?.trim() ?? "";
  if (wanted.length === 0) {
    return null;
  }
  const entry = readLinkedProjectFolders(profileDir).find(
    (row) => row.projectId === wanted,
  );
  const folderPath = entry?.folderPath.trim() ?? "";
  return folderPath.length > 0 ? folderPath : null;
};
