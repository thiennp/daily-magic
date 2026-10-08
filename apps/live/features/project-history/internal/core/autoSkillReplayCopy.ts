import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const REPLAY_MAX_FILES = 3_000;
export const REPLAY_MAX_BYTES = 20 * 1024 * 1024;
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".turbo",
  ".cache",
  "coverage",
]);

const trackedFiles = (folder: string): Promise<string[] | null> =>
  new Promise((resolve) => {
    execFile(
      "git",
      ["ls-files", "-z"],
      { cwd: folder, maxBuffer: 16 * 1024 * 1024, timeout: 10_000 },
      (error, stdout) =>
        resolve(error ? null : stdout.split("\0").filter((f) => f.length > 0)),
    );
  });

const walk = (root: string, dir: string, out: string[]): void => {
  for (const entry of fs.readdirSync(path.join(root, dir), {
    withFileTypes: true,
  })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory() && !SKIP_DIRS.has(entry.name)) {
      walk(root, rel, out);
    } else if (entry.isFile()) {
      out.push(rel);
    }
    if (out.length > REPLAY_MAX_FILES) {
      return;
    }
  }
};

export type ReplayCopy =
  { readonly ok: true } | { readonly ok: false; readonly note: string };

/**
 * Copy the tracked files (git) or a walk that skips node_modules/.git/dist
 * into `target`. Refuses (note) when over the file or byte cap.
 */
export const copyProjectForReplay = async (
  folder: string,
  target: string,
): Promise<ReplayCopy> => {
  try {
    const files =
      (await trackedFiles(folder)) ??
      (() => {
        const found: string[] = [];
        walk(folder, "", found);
        return found;
      })();
    if (files.length > REPLAY_MAX_FILES) {
      return { ok: false, note: "folder too large" };
    }
    let bytes = 0;
    for (const rel of files) {
      const source = path.join(folder, rel);
      const stat = fs.lstatSync(source, { throwIfNoEntry: false });
      if (stat === undefined || !stat.isFile()) {
        continue;
      }
      bytes += stat.size;
      if (bytes > REPLAY_MAX_BYTES) {
        return { ok: false, note: "folder too large" };
      }
      fs.mkdirSync(path.join(target, path.dirname(rel)), { recursive: true });
      fs.copyFileSync(source, path.join(target, rel));
    }
    return { ok: true };
  } catch {
    return { ok: false, note: "copy failed" };
  }
};
