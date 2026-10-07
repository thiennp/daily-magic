import fs from "node:fs";
import path from "node:path";

/** Project → folder links on THIS computer (in the AWL profile dir). */
export const LINKED_PROJECT_FOLDERS_FILE_NAME = "linked-project-folders.json";

export interface LinkedProjectFolderEntry {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly folderPath: string;
  readonly isGitRepo: boolean;
  readonly linkedAt: string;
}

const resolveFilePath = (profileDir: string): string =>
  path.join(profileDir, LINKED_PROJECT_FOLDERS_FILE_NAME);

const isEntry = (value: unknown): value is LinkedProjectFolderEntry => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row.projectId === "string" &&
    typeof row.folderPath === "string" &&
    typeof row.linkedAt === "string" &&
    typeof row.isGitRepo === "boolean" &&
    (row.projectName === null || typeof row.projectName === "string")
  );
};

export const readLinkedProjectFolders = (
  profileDir: string,
): readonly LinkedProjectFolderEntry[] => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(resolveFilePath(profileDir), "utf8"),
    );
    const folders = (parsed as { folders?: unknown } | null)?.folders;
    return Array.isArray(folders) ? folders.filter(isEntry) : [];
  } catch {
    return [];
  }
};

/** Upsert by projectId (one folder per project on this computer). */
export const saveLinkedProjectFolder = (
  profileDir: string,
  entry: LinkedProjectFolderEntry,
): void => {
  const folders = [
    ...readLinkedProjectFolders(profileDir).filter(
      (row) => row.projectId !== entry.projectId,
    ),
    entry,
  ];
  const filePath = resolveFilePath(profileDir);
  const tmpPath = `${filePath}.${process.pid}.tmp`;
  fs.mkdirSync(profileDir, { recursive: true });
  fs.writeFileSync(
    tmpPath,
    `${JSON.stringify({ version: 1, folders }, null, 2)}\n`,
    { mode: 0o600 },
  );
  fs.renameSync(tmpPath, filePath);
};
