import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import expandAgentWitchProjectFolderPath from "../expandAgentWitchProjectFolderPath";
import { isPathInsideFolder } from "../runFolderAllowlist/isPathInsideFolder";

export type LinkableProjectFolderRefusalCode =
  | "folder_required"
  | "folder_not_absolute"
  | "folder_not_found"
  | "not_a_folder"
  | "folder_not_readable"
  | "folder_is_home"
  | "folder_outside_home";

export type LinkableProjectFolderCheck =
  | {
      readonly ok: true;
      /** realpath (symlinks resolved) — what gets linked. */
      readonly folderRealPath: string;
      readonly isGitRepo: boolean;
    }
  | {
      readonly ok: false;
      readonly code: LinkableProjectFolderRefusalCode;
      readonly message: string;
    };

export interface ValidateLinkableProjectFolderInput {
  readonly folderPath: string;
  /** Explicit opt-in for a folder outside the user's home (e.g. native picker). */
  readonly allowOutsideHome?: boolean;
  /** Test seam; defaults to os.homedir(). */
  readonly homeDir?: string;
}

const MESSAGES: Record<LinkableProjectFolderRefusalCode, string> = {
  folder_required: "Choose a folder to link.",
  folder_not_absolute: "Use a full folder path, like ~/daily-magic.",
  folder_not_found: "That folder does not exist on this computer.",
  not_a_folder: "That path is a file, not a folder.",
  folder_not_readable: "AgentWitch cannot read that folder.",
  folder_is_home:
    "Your whole home folder is too broad. Pick the project folder inside it.",
  folder_outside_home:
    "That folder is outside your home folder. Pick one inside your home folder, or confirm it explicitly.",
};

const refuse = (
  code: LinkableProjectFolderRefusalCode,
): LinkableProjectFolderCheck => ({ ok: false, code, message: MESSAGES[code] });

const realPathOrNull = (target: string): string | null => {
  try {
    return fs.realpathSync.native(target);
  } catch {
    return null;
  }
};

/**
 * Checks a folder before it becomes an AgentWitch project folder on this
 * computer: exists, is a readable directory, symlinks resolved, inside the
 * user's home unless explicitly allowed. Git is reported, not required.
 */
export const validateLinkableProjectFolder = (
  input: ValidateLinkableProjectFolderInput,
): LinkableProjectFolderCheck => {
  const trimmed = input.folderPath.trim();
  if (trimmed.length === 0 || trimmed.includes("\0")) {
    return refuse("folder_required");
  }
  const expanded = expandAgentWitchProjectFolderPath(trimmed);
  if (!path.isAbsolute(expanded)) {
    return refuse("folder_not_absolute");
  }
  const folderRealPath = realPathOrNull(path.resolve(expanded));
  if (folderRealPath === null) {
    return refuse("folder_not_found");
  }
  if (!fs.statSync(folderRealPath).isDirectory()) {
    return refuse("not_a_folder");
  }
  try {
    fs.accessSync(folderRealPath, fs.constants.R_OK | fs.constants.X_OK);
  } catch {
    return refuse("folder_not_readable");
  }
  const homeReal = realPathOrNull(input.homeDir ?? os.homedir());
  if (homeReal !== null && folderRealPath === homeReal) {
    return refuse("folder_is_home");
  }
  const insideHome =
    homeReal !== null && isPathInsideFolder(folderRealPath, homeReal);
  if (!insideHome && input.allowOutsideHome !== true) {
    return refuse("folder_outside_home");
  }
  return {
    ok: true,
    folderRealPath,
    isGitRepo: fs.existsSync(path.join(folderRealPath, ".git")),
  };
};
