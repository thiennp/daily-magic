import { execFileSync } from "node:child_process";

const GIT_TIMEOUT_MS = 1_500;
const SCP_REMOTE = /^[\w.-]+@[\w.-]+:[\w./~+-]+$/u;

/**
 * Remote URL safe to show and save: userinfo is dropped from https URLs,
 * only the password is dropped from ssh URLs, query and fragment are always
 * dropped. Anything that is not https / ssh / scp style returns null.
 */
export const stripGitRemoteCredentials = (raw: string): string | null => {
  const remote = raw.trim();
  if (SCP_REMOTE.test(remote)) {
    return remote;
  }
  try {
    const url = new URL(remote);
    if (url.protocol !== "https:" && url.protocol !== "ssh:") {
      return null;
    }
    if (url.protocol === "https:") {
      url.username = "";
    }
    url.password = "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
};

const git = (folderPath: string, args: readonly string[]): string | null => {
  try {
    const out = execFileSync("git", ["-C", folderPath, ...args], {
      encoding: "utf8",
      timeout: GIT_TIMEOUT_MS,
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
};

export interface GitFolderInfo {
  readonly gitRemoteUrl?: string;
  readonly branch?: string;
}

/** `origin` remote (credentials stripped) and current branch; never throws. */
export const readGitFolderInfo = (folderPath: string): GitFolderInfo => {
  const remote = git(folderPath, ["config", "--get", "remote.origin.url"]);
  const gitRemoteUrl =
    remote === null ? null : stripGitRemoteCredentials(remote);
  const branch = git(folderPath, ["rev-parse", "--abbrev-ref", "HEAD"]);
  return {
    ...(gitRemoteUrl !== null ? { gitRemoteUrl } : {}),
    // A detached HEAD reports the literal "HEAD": no branch to show.
    ...(branch !== null && branch !== "HEAD" ? { branch } : {}),
  };
};
