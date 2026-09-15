import fs from "node:fs";
import path from "node:path";

import type { HarnessInstallItemKind } from "../harnessInstallBundle.types";
import { buildLocalHarnessItemId } from "./buildLocalHarnessItemId";
import { inferHarnessItemKindFromRelativePath } from "./inferHarnessItemKind";
import { resolveSafePathUnderHome } from "./pathSafety";

export interface LocalHarnessCandidateItem {
  readonly id: string;
  readonly kind: HarnessInstallItemKind;
  readonly title: string;
  readonly sourcePath: string;
  readonly selected: boolean;
}

export interface LocalHarnessCandidateSet {
  readonly proposedSlug: string;
  readonly proposedName: string;
  readonly sourceRoot: string;
  readonly repoPath: string;
  readonly items: readonly LocalHarnessCandidateItem[];
}

export interface LocalHarnessRevealResult {
  readonly scanRoots: readonly string[];
  readonly sets: readonly LocalHarnessCandidateSet[];
}

const SKIP_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "coverage",
]);

const sanitizeHarnessSlug = (value: string): string => {
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

const findCursorDirectories = (
  scanRoot: string,
  maxDepth: number,
): readonly string[] => {
  const found: string[] = [];

  const walk = (current: string, depth: number): void => {
    if (depth > maxDepth) {
      return;
    }

    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      if (SKIP_DIR_NAMES.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(current, entry.name);
      if (entry.name === ".cursor") {
        found.push(absolutePath);
        continue;
      }

      walk(absolutePath, depth + 1);
    }
  };

  walk(scanRoot, 0);
  return found;
};

export const revealLocalHarnessCandidates = (input: {
  readonly scanRoots: readonly string[];
  readonly maxDepth?: number;
}): LocalHarnessRevealResult => {
  const maxDepth = input.maxDepth ?? 5;
  const cursorDirs = new Map<string, string>();

  for (const rootRaw of input.scanRoots) {
    const safeRoot = resolveSafePathUnderHome(rootRaw);
    if (safeRoot === null) {
      continue;
    }

    for (const cursorDir of findCursorDirectories(safeRoot, maxDepth)) {
      const safeCursor = resolveSafePathUnderHome(cursorDir);
      if (safeCursor !== null) {
        cursorDirs.set(safeCursor, safeCursor);
      }
    }
  }

  const sets: LocalHarnessCandidateSet[] = [];

  for (const cursorDir of cursorDirs.values()) {
    const repoPath = path.dirname(cursorDir);
    const proposedName = path.basename(repoPath);
    const proposedSlug = sanitizeHarnessSlug(proposedName);
    const files = collectCursorFiles(cursorDir);

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

    if (items.length === 0) {
      continue;
    }

    sets.push({
      proposedSlug,
      proposedName,
      sourceRoot: cursorDir,
      repoPath,
      items,
    });
  }

  sets.sort((left, right) =>
    left.proposedName.localeCompare(right.proposedName),
  );

  const scanRoots = input.scanRoots
    .map((entry) => resolveSafePathUnderHome(entry))
    .filter((entry): entry is string => entry !== null);

  return { scanRoots, sets };
};
