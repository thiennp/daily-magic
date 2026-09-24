import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface AgentWitchGitWorktreeSnapshot {
  readonly isGitRepo: boolean;
  readonly branch: string | null;
  readonly porcelainLineCount: number;
  readonly shortstat: string | null;
}

const runGit = async (
  cwd: string,
  args: readonly string[],
): Promise<string | null> => {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd,
      maxBuffer: 1024 * 1024,
    });
    return stdout.trim();
  } catch {
    return null;
  }
};

export const captureAgentWitchGitWorktreeSnapshot = async (
  projectFolderPath: string,
): Promise<AgentWitchGitWorktreeSnapshot> => {
  const gitDir = await runGit(projectFolderPath, ["rev-parse", "--git-dir"]);
  if (gitDir === null || gitDir.length === 0) {
    return {
      isGitRepo: false,
      branch: null,
      porcelainLineCount: 0,
      shortstat: null,
    };
  }

  const branch = await runGit(projectFolderPath, [
    "rev-parse",
    "--abbrev-ref",
    "HEAD",
  ]);
  const porcelain = await runGit(projectFolderPath, ["status", "--porcelain"]);
  const shortstat = await runGit(projectFolderPath, [
    "diff",
    "--shortstat",
    "HEAD",
  ]);

  const porcelainLineCount =
    porcelain === null || porcelain.length === 0
      ? 0
      : porcelain.split("\n").filter((line) => line.trim().length > 0).length;

  return {
    isGitRepo: true,
    branch,
    porcelainLineCount,
    shortstat: shortstat === null || shortstat.length === 0 ? null : shortstat,
  };
};
