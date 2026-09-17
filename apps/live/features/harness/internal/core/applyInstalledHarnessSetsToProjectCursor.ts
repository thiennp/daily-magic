import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { harnessSetComponentId } from "../../../projects/internal/core/agentWitchMaterialization.constants";
import {
  buildLedgerEntryForManagedFile,
  materializeManagedRepoFile,
} from "../../../projects/internal/core/materializeManagedRepoFile";
import { readAgentWitchMaterializationLedger } from "../../../projects/internal/core/readAgentWitchMaterializationLedger";
import { removeHarnessSetMaterializationFromLedger } from "../../../projects/internal/core/removeHarnessSetMaterialization";
import { resolveAgentWitchMaterializationPaths } from "../../../projects/internal/core/resolveAgentWitchMaterializationPaths";
import { resolveNamespacedHarnessCursorRelativePath } from "../../../projects/internal/core/resolveNamespacedHarnessCursorRelativePath";
import { writeAgentWitchMaterializationLedger } from "../../../projects/internal/core/writeAgentWitchMaterializationLedger";
import expandAgentWitchProjectFolderPath from "../../../projects/internal/core/expandAgentWitchProjectFolderPath";
import { ensureAgentWitchProjectFolder } from "../../../projects/internal/core/ensureAgentWitchProjectFolder";
import { resolveHarnessItemSourceAbsolutePath } from "./componentStore/resolveHarnessItemSourceAbsolutePath";
import { readAgentWitchProjectHarnessSetSlugs } from "./readAgentWitchProjectHarnessLink";
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
      readonly skippedFileCount: number;
      readonly backedUpFileCount: number;
      readonly removedLedgerPathCount: number;
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

  const ensureResult = ensureAgentWitchProjectFolder({
    projectFolderPath: safeProjectPath,
  });
  const { ledgerFilePath, backupsDirPath } =
    resolveAgentWitchMaterializationPaths(ensureResult.layout);

  const previousSlugs = readAgentWitchProjectHarnessSetSlugs(safeProjectPath);
  const removedSlugs = previousSlugs.filter(
    (slug) => !uniqueSlugs.includes(slug),
  );

  let ledger = readAgentWitchMaterializationLedger(ledgerFilePath);
  let removedLedgerPathCount = 0;
  if (removedSlugs.length > 0) {
    const removal = removeHarnessSetMaterializationFromLedger({
      repoRoot: safeProjectPath,
      setSlugs: removedSlugs,
      ledger,
    });
    ledger = removal.ledger;
    removedLedgerPathCount = removal.summary.removedPaths.length;
  }

  if (uniqueSlugs.length === 0) {
    writeAgentWitchMaterializationLedger(ledgerFilePath, ledger);
    writeProjectHarnessLinkMeta(ensureResult.layout.metaFilePath, []);
    return {
      ok: true,
      writtenFileCount: 0,
      skippedFileCount: 0,
      backedUpFileCount: 0,
      removedLedgerPathCount,
      projectFolderPath: safeProjectPath,
      appliedSetSlugs: [],
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
  let writtenFileCount = 0;
  let skippedFileCount = 0;
  let backedUpFileCount = 0;

  for (const slug of uniqueSlugs) {
    const setEntry = setsRecord[slug];
    if (!isRecord(setEntry)) {
      return {
        ok: false,
        errorMessage: `Harness set "${slug}" is not installed locally.`,
      };
    }

    const versionId =
      typeof setEntry.version === "number" ? String(setEntry.version) : "1";
    const componentId = harnessSetComponentId(slug);
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

      const namespacedRelative = resolveNamespacedHarnessCursorRelativePath(
        slug,
        cursorRelativePath,
      );
      const repoRelativeDestination = path.posix
        .join(".cursor", namespacedRelative)
        .replaceAll("\\", "/");

      const manifestItemId = typeof item.id === "string" ? item.id.trim() : "";
      const sourcePath = resolveHarnessItemSourceAbsolutePath({
        layout: input.layout,
        setSlug: slug,
        setVersion: typeof setEntry.version === "number" ? setEntry.version : 1,
        manifestItemPath,
        manifestItemId,
      });
      if (sourcePath === null) {
        continue;
      }

      const materializeResult = materializeManagedRepoFile({
        repoRoot: safeProjectPath,
        backupsDir: backupsDirPath,
        repoRelativeDestination,
        sourceAbsolutePath: sourcePath,
        componentId,
        versionId,
        ledger,
      });

      if (materializeResult.kind === "skipped_unchanged") {
        skippedFileCount += 1;
        continue;
      }

      if (materializeResult.kind === "backed_up_user_file") {
        backedUpFileCount += 1;
        writtenFileCount += 1;
        ledger = {
          version: 1,
          entries: {
            ...ledger.entries,
            [repoRelativeDestination]: buildLedgerEntryForManagedFile({
              componentId,
              versionId,
              sourceAbsolutePath: sourcePath,
              backupPath: materializeResult.backupPath,
            }),
          },
        };
        continue;
      }

      writtenFileCount += 1;
      ledger = {
        version: 1,
        entries: {
          ...ledger.entries,
          [repoRelativeDestination]: buildLedgerEntryForManagedFile({
            componentId,
            versionId,
            sourceAbsolutePath: sourcePath,
          }),
        },
      };
    }
  }

  if (
    writtenFileCount === 0 &&
    skippedFileCount === 0 &&
    removedLedgerPathCount === 0
  ) {
    return {
      ok: false,
      errorMessage:
        "No harness files were written. Check that selected sets contain items on disk.",
    };
  }

  writeAgentWitchMaterializationLedger(ledgerFilePath, ledger);
  writeProjectHarnessLinkMeta(ensureResult.layout.metaFilePath, uniqueSlugs);

  return {
    ok: true,
    writtenFileCount,
    skippedFileCount,
    backedUpFileCount,
    removedLedgerPathCount,
    projectFolderPath: safeProjectPath,
    appliedSetSlugs: uniqueSlugs,
  };
};
