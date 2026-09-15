import fs from "node:fs";
import path from "node:path";

import type { HarnessInstallItemKind } from "../harnessInstallBundle.types";
import { buildLocalHarnessItemId } from "./buildLocalHarnessItemId";
import { inferHarnessItemKindFromRelativePath } from "./inferHarnessItemKind";
import type {
  LocalHarnessCandidateItem,
  LocalHarnessCandidateSet,
} from "./revealLocalHarnessCandidates";

const SKIP_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
]);

export const sanitizeLocalHarnessSetSlug = (value: string): string => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized.length > 0 ? normalized : "harness-set";
};

const titleFromRelativePath = (
  kind: HarnessInstallItemKind,
  relativePath: string,
): string => {
  const base = path.basename(relativePath);
  if (kind === "skill") {
    const parts = relativePath.split(path.sep);
    const skillIndex = parts.indexOf("skills");
    if (skillIndex >= 0 && parts[skillIndex + 1] !== undefined) {
      return parts[skillIndex + 1] ?? base;
    }
  }

  return base.replace(/\.(mdc|md)$/i, "");
};

const collectCursorFiles = (
  cursorDir: string,
): readonly {
  readonly relativePath: string;
  readonly absolutePath: string;
}[] => {
  const results: { relativePath: string; absolutePath: string }[] = [];

  const walk = (currentDir: string, relativePrefix: string): void => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      if (entry.isDirectory() && SKIP_DIR_NAMES.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(currentDir, entry.name);
      const relativePath = relativePrefix
        ? path.join(relativePrefix, entry.name)
        : entry.name;

      if (entry.isDirectory()) {
        walk(absolutePath, relativePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const kind = inferHarnessItemKindFromRelativePath(
        relativePath.replaceAll("\\", "/"),
      );
      if (kind !== null) {
        results.push({ relativePath, absolutePath });
      }
    }
  };

  for (const subdir of [
    "rules",
    "commands",
    "agents",
    "instructions",
  ] as const) {
    const subPath = path.join(cursorDir, subdir);
    if (fs.existsSync(subPath)) {
      walk(subPath, subdir);
    }
  }

  const skillsRoot = path.join(cursorDir, "skills");
  if (fs.existsSync(skillsRoot)) {
    walk(skillsRoot, "skills");
  }

  return results;
};

export const buildLocalHarnessCandidateSetFromCursorDir = (
  cursorDir: string,
): LocalHarnessCandidateSet | null => {
  const files = collectCursorFiles(cursorDir);
  if (files.length === 0) {
    return null;
  }

  const repoPath = path.dirname(cursorDir);
  const proposedName = path.basename(repoPath);
  const proposedSlug = sanitizeLocalHarnessSetSlug(proposedName);

  const items: LocalHarnessCandidateItem[] = files.map((file) => {
    const kind = inferHarnessItemKindFromRelativePath(
      file.relativePath.replaceAll("\\", "/"),
    );
    if (kind === null) {
      throw new Error(`Unexpected harness file: ${file.relativePath}`);
    }

    return {
      id: buildLocalHarnessItemId(file.absolutePath),
      kind,
      title: titleFromRelativePath(kind, file.relativePath),
      sourcePath: file.absolutePath,
      selected: true,
    };
  });

  return {
    proposedSlug,
    proposedName,
    sourceRoot: cursorDir,
    repoPath,
    items,
  };
};

export const iterateCursorDirectoriesUnderRoot = function* (
  scanRoot: string,
  maxDepth: number,
  shouldAbort: () => boolean,
): Generator<string> {
  const walk = function* (current: string, depth: number): Generator<string> {
    if (shouldAbort() || depth > maxDepth) {
      return;
    }

    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (shouldAbort()) {
        return;
      }

      if (!entry.isDirectory()) {
        continue;
      }

      if (SKIP_DIR_NAMES.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(current, entry.name);
      if (entry.name === ".cursor") {
        yield absolutePath;
        continue;
      }

      yield* walk(absolutePath, depth + 1);
    }
  };

  yield* walk(scanRoot, 0);
};
