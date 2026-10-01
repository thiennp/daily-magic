import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { buildGitSubprocessEnv } from "@/lib/git/buildGitSubprocessEnv";

const MAX_FILE_BYTES = 8_000_000;
const MAX_CACHE_BYTES = 16_000_000;

const CACHE_PATHS = [
  "node_modules/.cache",
  ".next/cache",
  ".turbo",
  ".cache",
  ".swc",
  ".parcel-cache",
] as const;

export interface PromptSdlcRestorePoint {
  readonly workingDirectory: string;
  readonly git: boolean;
  readonly head: string | null;
  readonly isolateCaches: boolean;
  readonly complete: boolean;
  readonly startedMs: number;
  readonly tempDir: string;
  readonly beforeStatus: Readonly<Record<string, string>>;
  readonly files: Readonly<Record<string, string | null | "skip">>;
  readonly caches: readonly PromptSdlcCacheSnapshot[];
}

interface PromptSdlcCacheSnapshot {
  readonly relativePath: string;
  readonly existed: boolean;
  readonly copyDir: string | null;
}

const gitText = (cwd: string, args: readonly string[]): string | null => {
  const result = spawnSync("git", [...args], {
    cwd,
    env: buildGitSubprocessEnv(),
    encoding: "utf8",
    timeout: 8000,
  });
  if (result.status !== 0 || typeof result.stdout !== "string") {
    return null;
  }
  return result.stdout;
};

const gitOk = (cwd: string, args: readonly string[]): boolean =>
  spawnSync("git", [...args], {
    cwd,
    env: buildGitSubprocessEnv(),
    timeout: 8000,
  }).status === 0;

const statusMap = (cwd: string): Readonly<Record<string, string>> => {
  const raw = gitText(cwd, ["status", "--porcelain=v1", "-uall"]);
  if (raw === null) {
    return {};
  }
  return Object.fromEntries(
    raw.split("\n").flatMap((line) => {
      if (line.length < 4) {
        return [];
      }
      const body = line.slice(3).trim().replaceAll('"', "");
      const paths = body.includes(" -> ") ? body.split(" -> ") : [body];
      return paths.map((filePath) => [filePath.trim(), line] as const);
    }),
  );
};

const resolveInside = (cwd: string, filePath: string): string | null => {
  const resolved = path.resolve(cwd, filePath);
  const relative = path.relative(cwd, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  return resolved;
};

const readFileBytes = (cwd: string, filePath: string): Buffer | null => {
  const resolved = resolveInside(cwd, filePath);
  if (resolved === null || !fs.existsSync(resolved)) {
    return null;
  }
  const stat = fs.statSync(resolved);
  if (!stat.isFile() || stat.size > MAX_FILE_BYTES) {
    return null;
  }
  return fs.readFileSync(resolved);
};

const writeFileBytes = (cwd: string, filePath: string, bytes: Buffer): void => {
  const resolved = resolveInside(cwd, filePath);
  if (resolved === null) {
    return;
  }
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, bytes);
};

const removePath = (cwd: string, filePath: string): void => {
  const resolved = resolveInside(cwd, filePath);
  if (resolved === null || !fs.existsSync(resolved)) {
    return;
  }
  fs.rmSync(resolved, { recursive: true, force: true });
};

const trackedAtHead = (cwd: string, filePath: string): boolean =>
  gitOk(cwd, ["cat-file", "-e", `HEAD:${filePath}`]);

const headSha = (cwd: string): string | null => {
  const raw = gitText(cwd, ["rev-parse", "HEAD"]);
  return raw === null ? null : raw.trim();
};

const isolateCachesFor = (cwd: string): boolean =>
  path.resolve(cwd) !== path.resolve(os.homedir());

const directoryBytes = (resolved: string): number => {
  if (!fs.existsSync(resolved)) {
    return 0;
  }
  const stat = fs.statSync(resolved);
  if (stat.isFile()) {
    return stat.size;
  }
  if (!stat.isDirectory()) {
    return 0;
  }
  return fs.readdirSync(resolved).reduce((total, name) => {
    return total + directoryBytes(path.join(resolved, name));
  }, 0);
};

const snapshotCache = (
  cwd: string,
  tempDir: string,
  relativePath: string,
): PromptSdlcCacheSnapshot => {
  const resolved = resolveInside(cwd, relativePath);
  if (resolved === null || !fs.existsSync(resolved)) {
    return { relativePath, existed: false, copyDir: null };
  }
  if (directoryBytes(resolved) > MAX_CACHE_BYTES) {
    return { relativePath, existed: true, copyDir: null };
  }
  const copyDir = path.join(tempDir, "cache", relativePath);
  fs.mkdirSync(path.dirname(copyDir), { recursive: true });
  fs.cpSync(resolved, copyDir, { recursive: true });
  return { relativePath, existed: true, copyDir };
};

const MAX_WALK_FILES = 400;
const MAX_WALK_BYTES = 32_000_000;

const listFiles = (
  cwd: string,
): { readonly paths: readonly string[]; readonly complete: boolean } => {
  const paths: string[] = [];
  let bytes = 0;
  let complete = true;
  const walk = (dir: string): void => {
    if (!complete || !fs.existsSync(dir)) {
      return;
    }
    for (const name of fs.readdirSync(dir)) {
      if (!complete || name === ".git" || name === "node_modules") {
        continue;
      }
      const abs = path.join(dir, name);
      const stat = fs.statSync(abs);
      if (stat.isDirectory()) {
        walk(abs);
        continue;
      }
      if (!stat.isFile() || stat.size > MAX_FILE_BYTES) {
        continue;
      }
      if (
        paths.length >= MAX_WALK_FILES ||
        bytes + stat.size > MAX_WALK_BYTES
      ) {
        complete = false;
        return;
      }
      bytes += stat.size;
      paths.push(path.relative(cwd, abs));
    }
  };
  walk(cwd);
  return { paths, complete };
};

const saveBytes = (
  cwd: string,
  tempDir: string,
  filePath: string,
): string | null | "skip" => {
  const resolved = resolveInside(cwd, filePath);
  if (resolved === null || !fs.existsSync(resolved)) {
    return null;
  }
  const bytes = readFileBytes(cwd, filePath);
  if (bytes === null) {
    return "skip";
  }
  const stored = path.join(tempDir, "files", filePath);
  fs.mkdirSync(path.dirname(stored), { recursive: true });
  fs.writeFileSync(stored, bytes);
  return stored;
};

export const capturePromptSdlcRestorePoint = (input: {
  readonly workingDirectory: string;
  readonly git: boolean;
  readonly namedPaths: readonly string[];
}): PromptSdlcRestorePoint => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-revert-"));
  const beforeStatus = input.git ? statusMap(input.workingDirectory) : {};
  const walked = input.git
    ? { paths: [] as readonly string[], complete: true }
    : listFiles(input.workingDirectory);
  const paths = input.git
    ? [...Object.keys(beforeStatus), ...input.namedPaths]
    : [...walked.paths, ...input.namedPaths];
  const files = Object.fromEntries(
    [...new Set(paths)].map((filePath) => [
      filePath,
      saveBytes(input.workingDirectory, tempDir, filePath),
    ]),
  );
  return {
    workingDirectory: input.workingDirectory,
    git: input.git,
    head: input.git ? headSha(input.workingDirectory) : null,
    isolateCaches: isolateCachesFor(input.workingDirectory),
    complete: walked.complete,
    startedMs: Date.now(),
    tempDir,
    beforeStatus,
    files,
    caches: CACHE_PATHS.map((relativePath) =>
      snapshotCache(input.workingDirectory, tempDir, relativePath),
    ),
  };
};

const restoreSavedFile = (
  point: PromptSdlcRestorePoint,
  filePath: string,
): void => {
  const stored = point.files[filePath];
  if (stored === undefined || stored === "skip") {
    return;
  }
  if (stored === null) {
    removePath(point.workingDirectory, filePath);
    return;
  }
  writeFileBytes(point.workingDirectory, filePath, fs.readFileSync(stored));
};

const restoreGitPath = (
  point: PromptSdlcRestorePoint,
  filePath: string,
): void => {
  if (point.files[filePath] !== undefined && point.files[filePath] !== "skip") {
    restoreSavedFile(point, filePath);
  } else if (trackedAtHead(point.workingDirectory, filePath)) {
    gitOk(point.workingDirectory, [
      "restore",
      "--source=HEAD",
      "--worktree",
      "--staged",
      "--",
      filePath,
    ]);
  } else {
    removePath(point.workingDirectory, filePath);
  }
  const before = point.beforeStatus[filePath] ?? "  ";
  const indexClean = before.startsWith(" ") || before.startsWith("?");
  if (indexClean && trackedAtHead(point.workingDirectory, filePath)) {
    gitOk(point.workingDirectory, [
      "restore",
      "--staged",
      "--source=HEAD",
      "--",
      filePath,
    ]);
  }
  if (indexClean && !trackedAtHead(point.workingDirectory, filePath)) {
    gitOk(point.workingDirectory, ["reset", "-q", "HEAD", "--", filePath]);
  }
};

const restoreCache = (
  point: PromptSdlcRestorePoint,
  cache: PromptSdlcCacheSnapshot,
): void => {
  const resolved = resolveInside(point.workingDirectory, cache.relativePath);
  if (resolved === null) {
    return;
  }
  if (cache.copyDir !== null) {
    removePath(point.workingDirectory, cache.relativePath);
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.cpSync(cache.copyDir, resolved, { recursive: true });
    return;
  }
  if (!point.isolateCaches) {
    return;
  }
  if (!cache.existed) {
    removePath(point.workingDirectory, cache.relativePath);
    return;
  }
  if (!fs.existsSync(resolved)) {
    return;
  }
  for (const name of fs.readdirSync(resolved)) {
    const abs = path.join(resolved, name);
    if (fs.statSync(abs).mtimeMs >= point.startedMs - 1000) {
      fs.rmSync(abs, { recursive: true, force: true });
    }
  }
};

export const revertPromptSdlcRunChanges = (
  point: PromptSdlcRestorePoint,
):
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string } => {
  try {
    if (point.git) {
      const afterHead = headSha(point.workingDirectory);
      if (afterHead !== point.head) {
        const moved =
          point.head === null
            ? gitOk(point.workingDirectory, ["update-ref", "-d", "HEAD"])
            : gitOk(point.workingDirectory, ["reset", "--hard", point.head]);
        if (!moved || headSha(point.workingDirectory) !== point.head) {
          throw new Error("head");
        }
      }
      const after = statusMap(point.workingDirectory);
      for (const filePath of new Set([
        ...Object.keys(point.beforeStatus),
        ...Object.keys(after),
        ...Object.keys(point.files),
      ])) {
        restoreGitPath(point, filePath);
      }
    } else {
      if (point.complete) {
        for (const filePath of listFiles(point.workingDirectory).paths) {
          if (point.files[filePath] === undefined) {
            removePath(point.workingDirectory, filePath);
          }
        }
      }
      for (const filePath of Object.keys(point.files)) {
        restoreSavedFile(point, filePath);
      }
    }
    for (const cache of point.caches) {
      restoreCache(point, cache);
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      errorMessage: "Could not put the folder back after the run.",
    };
  } finally {
    fs.rmSync(point.tempDir, { recursive: true, force: true });
  }
};
