import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import expandAgentWitchProjectFolderPath from "../../../projects/internal/core/expandAgentWitchProjectFolderPath";
import { ensureAgentWitchProjectFolder } from "../../../projects/internal/core/ensureAgentWitchProjectFolder";
import { resolveSafePathUnderHome } from "./localHarness/pathSafety";
import { resolveHarnessManifestItemCursorRelativePath } from "./resolveHarnessManifestItemCursorRelativePath";

export type ApplyInstalledHarnessSetsToProjectCursorInput = {
  readonly layout: AgentWitchLocalLayout;
  readonly projectFolderPath: string;
  readonly setSlugs: readonly string[];
};

export type ApplyInstalledHarnessSetsToProjectCursorResult =
  | {
      readonly ok: true;
      readonly writtenFileCount: number;
      readonly projectFolderPath: string;
      readonly appliedSetSlugs: readonly string[];
    }
  | {
      readonly ok: false;
      readonly errorMessage: string;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readHarnessManifestRecord = (
  manifestPath: string,
): Record<string, unknown> | null => {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (isRecord(parsed) && parsed.version === 1) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

const resolveHarnessItemAbsolutePath = (
  layout: AgentWitchLocalLayout,
  setSlug: string,
  manifestItemPath: string,
): string | null => {
  const trimmed = manifestItemPath.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const absolutePath = trimmed.startsWith("shared/")
    ? path.join(layout.harnessRootDir, trimmed)
    : path.join(layout.harnessSetsDir, setSlug, trimmed);

  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  try {
    const stat = fs.statSync(absolutePath);
    if (!stat.isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  return absolutePath;
};

const writeProjectHarnessLinkMeta = (
  metaFilePath: string,
  appliedSetSlugs: readonly string[],
): void => {
  let existing: Record<string, unknown> = {};
  if (fs.existsSync(metaFilePath)) {
    try {
      const parsed: unknown = JSON.parse(fs.readFileSync(metaFilePath, "utf8"));
      if (isRecord(parsed)) {
        existing = parsed;
      }
    } catch {
      existing = {};
    }
  }

  const merged = {
    ...existing,
    harnessSetSlugs: [...appliedSetSlugs],
    harnessAppliedAt: new Date().toISOString(),
  };

  fs.writeFileSync(metaFilePath, `${JSON.stringify(merged, null, 2)}\n`);
};

export const applyInstalledHarnessSetsToProjectCursor = (
  input: ApplyInstalledHarnessSetsToProjectCursorInput,
): ApplyInstalledHarnessSetsToProjectCursorResult => {
  const uniqueSlugs = [
    ...new Set(
      input.setSlugs
        .map((slug) => slug.trim())
        .filter((slug) => slug.length > 0),
    ),
  ];

  if (uniqueSlugs.length === 0) {
    return { ok: false, errorMessage: "Choose at least one harness set." };
  }

  const expandedProjectPath = expandAgentWitchProjectFolderPath(
    input.projectFolderPath,
  );
  const safeProjectPath = resolveSafePathUnderHome(expandedProjectPath);
  if (safeProjectPath === null) {
    return {
      ok: false,
      errorMessage: "Project folder must exist under your home directory.",
    };
  }

  let projectStat: fs.Stats;
  try {
    projectStat = fs.statSync(safeProjectPath);
  } catch {
    return {
      ok: false,
      errorMessage: "Project folder could not be read.",
    };
  }

  if (!projectStat.isDirectory()) {
    return {
      ok: false,
      errorMessage: "Project path must be a folder (repo root).",
    };
  }

  const manifest = readHarnessManifestRecord(input.layout.harnessManifestPath);
  if (manifest === null) {
    return {
      ok: false,
      errorMessage: "No local harness manifest found. Submit a harness first.",
    };
  }

  const setsRecord = isRecord(manifest.sets) ? manifest.sets : {};
  const cursorRoot = path.join(safeProjectPath, ".cursor");
  let writtenFileCount = 0;

  for (const slug of uniqueSlugs) {
    const setEntry = setsRecord[slug];
    if (!isRecord(setEntry)) {
      return {
        ok: false,
        errorMessage: `Harness set "${slug}" is not installed locally.`,
      };
    }

    const items = Array.isArray(setEntry.items) ? setEntry.items : [];
    for (const item of items) {
      if (!isRecord(item)) {
        continue;
      }

      const manifestItemPath =
        typeof item.path === "string" ? item.path.trim() : "";
      if (manifestItemPath.length === 0) {
        continue;
      }

      const cursorRelativePath =
        resolveHarnessManifestItemCursorRelativePath(manifestItemPath);
      if (cursorRelativePath === null) {
        continue;
      }

      const sourcePath = resolveHarnessItemAbsolutePath(
        input.layout,
        slug,
        manifestItemPath,
      );
      if (sourcePath === null) {
        continue;
      }

      const destinationPath = path.join(cursorRoot, cursorRelativePath);
      fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
      fs.copyFileSync(sourcePath, destinationPath);
      writtenFileCount += 1;
    }
  }

  if (writtenFileCount === 0) {
    return {
      ok: false,
      errorMessage:
        "No harness files were written. Check that selected sets contain items on disk.",
    };
  }

  const ensureResult = ensureAgentWitchProjectFolder({
    projectFolderPath: safeProjectPath,
  });
  writeProjectHarnessLinkMeta(ensureResult.layout.metaFilePath, uniqueSlugs);

  return {
    ok: true,
    writtenFileCount,
    projectFolderPath: safeProjectPath,
    appliedSetSlugs: uniqueSlugs,
  };
};
