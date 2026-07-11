import { execSync } from "node:child_process";
import path from "node:path";

export type ChangedFilesMode = "staged" | "working" | "base";

export interface GetChangedFilesOptions {
  readonly appRoot: string;
  readonly mode: ChangedFilesMode;
  readonly baseRef?: string;
  readonly explicitPaths?: readonly string[];
}

const normalizeRepoPath = (appRoot: string, filePath: string): string => {
  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(appRoot, filePath);
  return path.relative(appRoot, absolute).replace(/\\/g, "/");
};

const readGitLines = (command: string, appRoot: string): readonly string[] => {
  const output = execSync(command, { encoding: "utf-8", cwd: appRoot }).trim();
  if (output.length === 0) {
    return [];
  }
  return output.split("\n").filter(Boolean);
};

const gitRefExists = (ref: string, appRoot: string): boolean => {
  try {
    execSync(`git rev-parse --verify ${ref}^{commit}`, {
      encoding: "utf-8",
      cwd: appRoot,
      stdio: ["pipe", "pipe", "pipe"],
    });
    return true;
  } catch {
    return false;
  }
};

const resolveBaseRef = (requested: string, appRoot: string): string => {
  const changeTarget = process.env.CHANGE_TARGET?.trim();
  const candidates = [
    requested,
    ...(changeTarget !== undefined && changeTarget.length > 0
      ? [`origin/${changeTarget}`, changeTarget]
      : []),
    "origin/main",
    "main",
    "origin/release",
    "release",
  ];
  const uniqueCandidates = [...new Set(candidates)];
  const resolved = uniqueCandidates.find((ref) => gitRefExists(ref, appRoot));
  if (resolved === undefined) {
    throw new Error(
      `No git base ref available for changed-file scope (tried: ${uniqueCandidates.join(", ")}). ` +
        "Fetch the merge target first, e.g. git fetch -f origin release:refs/remotes/origin/release --no-tags",
    );
  }
  return resolved;
};

const resolveGitChangedPaths = (
  options: GetChangedFilesOptions,
): readonly string[] => {
  if (options.explicitPaths !== undefined && options.explicitPaths.length > 0) {
    return options.explicitPaths.map((filePath) =>
      normalizeRepoPath(options.appRoot, filePath),
    );
  }

  if (options.mode === "staged") {
    return readGitLines(
      "git diff --name-only --cached --diff-filter=ACMRT",
      options.appRoot,
    );
  }

  if (options.mode === "base") {
    const baseRef = resolveBaseRef(
      options.baseRef ?? "origin/release",
      options.appRoot,
    );
    return readGitLines(
      `git diff --name-only --diff-filter=ACMRT ${baseRef}...HEAD`,
      options.appRoot,
    );
  }

  const unstaged = readGitLines(
    "git diff --name-only HEAD --diff-filter=ACMRT",
    options.appRoot,
  );
  const staged = readGitLines(
    "git diff --name-only --cached --diff-filter=ACMRT",
    options.appRoot,
  );
  return [...new Set([...unstaged, ...staged])];
};

export const getChangedFiles = (
  options: GetChangedFilesOptions,
): readonly string[] => {
  const uniquePaths = [...new Set(resolveGitChangedPaths(options))];
  return uniquePaths.sort();
};

export const filterChangedAppSources = (
  repoRelativePaths: readonly string[],
  extensions: readonly string[] = [".ts", ".tsx"],
): readonly string[] =>
  repoRelativePaths.filter((repoPath) => {
    const normalized = repoPath.replace(/\\/g, "/");
    if (!normalized.startsWith("app/")) {
      return false;
    }
    return extensions.some((extension) => normalized.endsWith(extension));
  });

export const filterChangedSrcSources = (
  repoRelativePaths: readonly string[],
  extensions: readonly string[] = [".ts", ".tsx"],
): readonly string[] =>
  repoRelativePaths.filter((repoPath) => {
    const normalized = repoPath.replace(/\\/g, "/");
    if (!normalized.startsWith("src/")) {
      return false;
    }
    return extensions.some((extension) => normalized.endsWith(extension));
  });
