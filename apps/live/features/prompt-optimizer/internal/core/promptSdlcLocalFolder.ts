import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import expandAgentWitchProjectFolderPath from "../../../projects/internal/core/expandAgentWitchProjectFolderPath";

export const PROMPT_SDLC_LOCAL_DEFAULT_FOLDER = "~";

const trimTrailingSlash = (value: string): string =>
  value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

export const displayPromptSdlcLocalFolder = (folderPath: string): string => {
  const home = os.homedir();
  const absolute = trimTrailingSlash(folderPath);
  if (absolute === home) {
    return "~";
  }
  if (absolute.startsWith(`${home}/`)) {
    return `~${absolute.slice(home.length)}`;
  }
  return absolute;
};

export const resolvePromptSdlcLocalFolder = (
  folder: string,
):
  | { readonly ok: true; readonly path: string; readonly display: string }
  | { readonly ok: false; readonly errorMessage: string } => {
  const raw = folder.trim().length === 0 ? "~" : folder.trim();
  const expanded = expandAgentWitchProjectFolderPath(raw);
  const absolute = path.isAbsolute(expanded)
    ? trimTrailingSlash(expanded)
    : trimTrailingSlash(path.resolve(os.homedir(), expanded));
  try {
    if (!fs.statSync(absolute).isDirectory()) {
      return {
        ok: false,
        errorMessage: "Choose a folder that exists on this computer.",
      };
    }
  } catch {
    return {
      ok: false,
      errorMessage: "Choose a folder that exists on this computer.",
    };
  }

  return {
    ok: true,
    path: absolute,
    display: displayPromptSdlcLocalFolder(absolute),
  };
};

export const promptSdlcLocalWorkingDirectory = (cycle: {
  readonly workingDirectory?: string;
}): string =>
  cycle.workingDirectory !== undefined && cycle.workingDirectory.length > 0
    ? cycle.workingDirectory
    : os.homedir();
