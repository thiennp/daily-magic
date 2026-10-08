import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { buildGitSubprocessEnv } from "@agent-witch/shared";

import { EPISODE_MAX_FILES } from "./episode.types";

const execFileAsync = promisify(execFile);
const COMMIT_SEPARATOR = "\u001e";
const FIELD_SEPARATOR = "\u001f";
const MAX_COMMITS = 10;

export type GitRunCommit = {
  readonly sha: string;
  readonly subject: string;
  readonly body: string;
};

export type GitRunChanges = {
  readonly commits: readonly GitRunCommit[];
  readonly committedFiles: readonly string[];
  readonly dirtyFiles: readonly string[];
  readonly branch: string | null;
};

const runGit = async (
  cwd: string,
  args: readonly string[],
): Promise<string | null> => {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd,
      env: buildGitSubprocessEnv(),
      maxBuffer: 1024 * 1024,
      timeout: 5_000,
    });
    return stdout.trim();
  } catch {
    return null;
  }
};

export const parseGitLogCommits = (raw: string): GitRunCommit[] =>
  raw
    .split(COMMIT_SEPARATOR)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => {
      const [sha = "", subject = "", ...bodyParts] =
        entry.split(FIELD_SEPARATOR);
      return { sha, subject, body: bodyParts.join(FIELD_SEPARATOR).trim() };
    })
    .filter((commit) => commit.sha.length > 0);

const splitLines = (raw: string | null): string[] =>
  raw === null ? [] : raw.split("\n").filter((line) => line.trim().length > 0);

/** Commits and files a run produced, relative to the HEAD captured before it. */
export const readGitRunChanges = async (input: {
  readonly projectFolderPath: string;
  readonly headBefore: string | null;
}): Promise<GitRunChanges> => {
  const cwd = input.projectFolderPath;
  const branch = await runGit(cwd, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const headAfter = await runGit(cwd, ["rev-parse", "HEAD"]);
  const moved =
    input.headBefore !== null &&
    headAfter !== null &&
    input.headBefore !== headAfter;

  const commits = moved
    ? parseGitLogCommits(
        (await runGit(cwd, [
          "log",
          `-${MAX_COMMITS}`,
          `--format=%H${FIELD_SEPARATOR}%s${FIELD_SEPARATOR}%b${COMMIT_SEPARATOR}`,
          `${input.headBefore}..HEAD`,
        ])) ?? "",
      )
    : [];

  const committedFiles = moved
    ? splitLines(
        await runGit(cwd, ["diff", "--name-only", `${input.headBefore}..HEAD`]),
      )
    : [];
  const porcelain = splitLines(await runGit(cwd, ["status", "--porcelain"]));
  const dirtyFiles = porcelain.map((line) => line.slice(3).trim());

  return {
    commits,
    committedFiles: committedFiles.slice(0, EPISODE_MAX_FILES),
    dirtyFiles: dirtyFiles.slice(0, EPISODE_MAX_FILES),
    branch,
  };
};

export type GitRecentCommit = {
  readonly sha: string;
  readonly committedAt: string;
  readonly subject: string;
  readonly files: readonly string[];
};

/** Recent commits with their files, used to attach SHAs to unverified fixes. */
export const readRecentGitCommitsWithFiles = async (input: {
  readonly projectFolderPath: string;
  readonly since: string;
}): Promise<GitRecentCommit[]> => {
  const raw = await runGit(input.projectFolderPath, [
    "log",
    "-30",
    `--since=${input.since}`,
    "--name-only",
    `--format=${COMMIT_SEPARATOR}%H${FIELD_SEPARATOR}%cI${FIELD_SEPARATOR}%s`,
  ]);
  if (raw === null) {
    return [];
  }
  return raw
    .split(COMMIT_SEPARATOR)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((chunk) => {
      const [header = "", ...fileLines] = chunk.split("\n");
      const [sha = "", committedAt = "", subject = ""] =
        header.split(FIELD_SEPARATOR);
      return {
        sha,
        committedAt,
        subject,
        files: fileLines.map((line) => line.trim()).filter(Boolean),
      };
    })
    .filter((commit) => commit.sha.length > 0);
};
