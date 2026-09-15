import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { HarnessInstallBundle } from "../harnessInstallBundle.types";
import { planHarnessInstallBundle } from "../planHarnessInstallBundle";
import type { AgentWitchLocalLayout } from "../resolveAgentWitchLocalLayout";
import { assertReadableFileUnderHome } from "./pathSafety";
import { normalizeLocalHarnessRevealResult } from "./normalizeLocalHarnessRevealResult";
import type { LocalHarnessRevealResult } from "./revealLocalHarnessCandidates";

export interface LocalHarnessSubmitItem {
  readonly id: string;
  readonly kind: HarnessInstallBundle["items"][number]["kind"];
  readonly title: string;
  readonly sourcePath: string;
  readonly include: boolean;
}

export interface LocalHarnessSubmitSet {
  readonly slug: string;
  readonly name: string;
  readonly items: readonly LocalHarnessSubmitItem[];
}

export interface SubmitLocalHarnessSelectionInput {
  readonly layout: AgentWitchLocalLayout;
  readonly sets: readonly LocalHarnessSubmitSet[];
  readonly hostname?: string;
}

export interface SubmitLocalHarnessSelectionResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly writtenItemCount?: number;
  readonly manifestPath?: string;
}

const readExistingManifest = (
  manifestPath: string,
): Parameters<typeof planHarnessInstallBundle>[0]["existingManifest"] => {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as { version?: unknown }).version === 1
    ) {
      return parsed as Parameters<
        typeof planHarnessInstallBundle
      >[0]["existingManifest"];
    }
  } catch {
    return null;
  }

  return null;
};

export const submitLocalHarnessSelection = (
  input: SubmitLocalHarnessSelectionInput,
): SubmitLocalHarnessSelectionResult => {
  const hostname = input.hostname ?? os.hostname();
  let manifest = readExistingManifest(input.layout.harnessManifestPath);
  let writtenItemCount = 0;
  const allDirectories = new Set<string>();
  const allFiles: { relativePath: string; content: string }[] = [];

  for (const set of input.sets) {
    const includedItems = set.items.filter((item) => item.include);
    if (includedItems.length === 0) {
      continue;
    }

    const bundleItems: HarnessInstallBundle["items"][number][] = [];

    for (const item of includedItems) {
      const safePath = assertReadableFileUnderHome(item.sourcePath);
      if (safePath === null) {
        return {
          ok: false,
          errorMessage: `Source file is not readable under your home folder: ${item.sourcePath}`,
        };
      }

      const content = fs.readFileSync(safePath, "utf8");
      bundleItems.push({
        id: item.id,
        kind: item.kind,
        title: item.title,
        content,
        setSlugs: [set.slug],
      });
    }

    const plan = planHarnessInstallBundle({
      bundle: {
        name: set.name,
        slug: set.slug,
        items: bundleItems,
      },
      hostname,
      existingManifest: manifest,
    });

    manifest = plan.manifest;
    for (const directory of plan.directories) {
      allDirectories.add(directory);
    }
    for (const file of plan.files) {
      allFiles.push(file);
      writtenItemCount += 1;
    }
  }

  if (manifest === null || writtenItemCount === 0) {
    return {
      ok: false,
      errorMessage: "Select at least one harness item to submit.",
    };
  }

  try {
    fs.mkdirSync(input.layout.harnessRootDir, { recursive: true });

    for (const directory of allDirectories) {
      fs.mkdirSync(`${input.layout.harnessRootDir}/${directory}`, {
        recursive: true,
      });
    }

    for (const file of allFiles) {
      const absolutePath = path.join(
        input.layout.harnessRootDir,
        file.relativePath,
      );
      fs.mkdirSync(path.dirname(absolutePath), {
        recursive: true,
      });
      fs.writeFileSync(absolutePath, file.content);
    }

    fs.writeFileSync(
      input.layout.harnessManifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    return {
      ok: true,
      writtenItemCount,
      manifestPath: input.layout.harnessManifestPath,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Harness submit failed.";
    return { ok: false, errorMessage: message };
  }
};

export const LOCAL_HARNESS_REVEAL_CACHE_FILE = "reveal-cache.json";

export const writeLocalHarnessRevealCache = (
  layout: AgentWitchLocalLayout,
  reveal: LocalHarnessRevealResult,
): void => {
  fs.mkdirSync(layout.harnessRootDir, { recursive: true });
  fs.writeFileSync(
    `${layout.harnessRootDir}/${LOCAL_HARNESS_REVEAL_CACHE_FILE}`,
    `${JSON.stringify(reveal, null, 2)}\n`,
  );
};

export const clearLocalHarnessRevealCache = (
  layout: AgentWitchLocalLayout,
): void => {
  const cachePath = `${layout.harnessRootDir}/${LOCAL_HARNESS_REVEAL_CACHE_FILE}`;
  if (fs.existsSync(cachePath)) {
    fs.unlinkSync(cachePath);
  }
};

export const readLocalHarnessRevealCache = (
  layout: AgentWitchLocalLayout,
): LocalHarnessRevealResult | null => {
  const cachePath = `${layout.harnessRootDir}/${LOCAL_HARNESS_REVEAL_CACHE_FILE}`;
  if (!fs.existsSync(cachePath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(cachePath, "utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "sets" in parsed &&
      Array.isArray((parsed as { sets: unknown }).sets)
    ) {
      return normalizeLocalHarnessRevealResult(
        parsed as LocalHarnessRevealResult,
      );
    }
  } catch {
    return null;
  }

  return null;
};
