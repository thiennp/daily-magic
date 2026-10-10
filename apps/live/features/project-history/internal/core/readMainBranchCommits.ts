import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { buildGitSubprocessEnv } from "@agent-witch/shared";

const execFileAsync = promisify(execFile);
const COMMIT_SEPARATOR = "\u001e";
const FIELD_SEPARATOR = "\u001f";
const GIT_TIMEOUT_MS = 20_000;

/** Commits fed to a scan when the owner has not asked for more. */
export const DEFAULT_SCAN_COMMITS = 100;
/** Hard ceiling for a deeper scan. */
export const MAX_SCAN_COMMITS = 2_000;

export type MainBranchCommit = {
  readonly sha: string;
  readonly subject: string;
  readonly body: string;
  readonly committedAt: string;
};

export type MainBranchHistory = {
  readonly branch: string;
  /** Commits on the branch in total (not just the ones returned). */
  readonly total: number;
  /** Newest first. */
  readonly commits: readonly MainBranchCommit[];
};

const runGit = async (
  cwd: string,
  args: readonly string[],
): Promise<string | null> => {
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd,
      env: buildGitSubprocessEnv(),
      maxBuffer: 64 * 1024 * 1024,
      timeout: GIT_TIMEOUT_MS,
    });
    return stdout.trim();
  } catch {
    return null;
  }
};

/** Clamp a requested commit count to 1..MAX_SCAN_COMMITS; anything else is the default. */
export const clampScanCommits = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value) && value >= 1
    ? Math.min(Math.floor(value), MAX_SCAN_COMMITS)
    : DEFAULT_SCAN_COMMITS;

export const parseMainBranchCommits = (raw: string): MainBranchCommit[] =>
  raw
    .split(COMMIT_SEPARATOR)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .flatMap((entry): MainBranchCommit[] => {
      const [sha = "", committedAt = "", subject = "", ...bodyParts] =
        entry.split(FIELD_SEPARATOR);
      return sha.length > 0 && subject.trim().length > 0
        ? [
            {
              sha,
              committedAt,
              subject: subject.trim(),
              body: bodyParts.join(FIELD_SEPARATOR).trim(),
            },
          ]
        : [];
    });

/** The main branch: origin's default, else a local main/master, else null. */
const resolveMainBranch = async (cwd: string): Promise<string | null> => {
  const originHead = await runGit(cwd, [
    "symbolic-ref",
    "--short",
    "refs/remotes/origin/HEAD",
  ]);
  const candidates = [
    ...(originHead !== null && originHead.length > 0
      ? [originHead.replace(/^origin\//, "")]
      : []),
    "main",
    "master",
  ];
  for (const name of candidates) {
    const found = await runGit(cwd, [
      "rev-parse",
      "--verify",
      "--quiet",
      `refs/heads/${name}`,
    ]);
    if (found !== null && found.length > 0) {
      return name;
    }
  }
  return null;
};

/**
 * Newest `limit` commits of the project folder's main branch, merges
 * skipped. Null when the folder is not a git repo or has no main branch.
 */
export const readMainBranchCommits = async (
  folderPath: string,
  limit: number,
): Promise<MainBranchHistory | null> => {
  const inside = await runGit(folderPath, [
    "rev-parse",
    "--is-inside-work-tree",
  ]);
  if (inside !== "true") {
    return null;
  }
  const branch = await resolveMainBranch(folderPath);
  if (branch === null) {
    return null;
  }
  const ref = `refs/heads/${branch}`;
  const countRaw = await runGit(folderPath, [
    "rev-list",
    "--count",
    "--no-merges",
    ref,
  ]);
  const total = Number.parseInt(countRaw ?? "", 10);
  if (!Number.isFinite(total) || total <= 0) {
    return null;
  }
  const raw = await runGit(folderPath, [
    "log",
    ref,
    "--no-merges",
    `--max-count=${clampScanCommits(limit)}`,
    `--format=%H${FIELD_SEPARATOR}%cI${FIELD_SEPARATOR}%s${FIELD_SEPARATOR}%b${COMMIT_SEPARATOR}`,
  ]);
  return raw === null
    ? null
    : { branch, total, commits: parseMainBranchCommits(raw) };
};
