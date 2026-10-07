import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { readLinkedProjectFolders } from "./linkedProjectFoldersFile";

export interface LinkedProjectFolderStatus {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly folderPath: string;
  readonly linkedAt: string;
  readonly folderFound: boolean;
  readonly isGitRepo: boolean;
  /** One plain sentence for status surfaces. */
  readonly summary: string;
}

export interface LinkedProjectFoldersStatus {
  readonly summary: string;
  readonly folders: readonly LinkedProjectFolderStatus[];
}

const displayFolder = (folderPath: string, homeDir: string): string =>
  folderPath === homeDir || folderPath.startsWith(`${homeDir}${path.sep}`)
    ? `~${folderPath.slice(homeDir.length)}`
    : folderPath;

const isDirectory = (folderPath: string): boolean => {
  try {
    return fs.statSync(folderPath).isDirectory();
  } catch {
    return false;
  }
};

/** Linked folders re-checked on disk now, with plain-words summaries. */
export const describeLinkedProjectFolders = (
  profileDir: string,
  homeDir: string = os.homedir(),
): LinkedProjectFoldersStatus => {
  const folders = readLinkedProjectFolders(profileDir).map((entry) => {
    const folderFound = isDirectory(entry.folderPath);
    const isGitRepo =
      folderFound && fs.existsSync(path.join(entry.folderPath, ".git"));
    const label = entry.projectName ?? `Project ${entry.projectId.slice(0, 8)}`;
    const shown = displayFolder(entry.folderPath, homeDir);
    const summary = !folderFound
      ? `${label}: linked folder ${shown} is missing on this computer.`
      : `${label} uses ${shown}${isGitRepo ? " (git repo)" : " (not a git repo)"}.`;
    return {
      projectId: entry.projectId,
      projectName: entry.projectName,
      folderPath: entry.folderPath,
      linkedAt: entry.linkedAt,
      folderFound,
      isGitRepo,
      summary,
    };
  });
  const summary =
    folders.length === 0
      ? "No project folder linked on this computer yet."
      : folders.map((folder) => folder.summary).join(" ");
  return { summary, folders };
};
