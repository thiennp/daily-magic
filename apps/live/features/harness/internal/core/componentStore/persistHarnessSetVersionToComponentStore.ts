import fs from "node:fs";
import path from "node:path";

import { harnessSetComponentId } from "./componentStore.constants";
import type { ComponentVersionManifestItem } from "./componentStore.types";
import { readComponentInstalledIndex } from "./readComponentInstalledIndex";
import { resolveAgentWitchComponentStorePaths } from "./resolveAgentWitchComponentStorePaths";
import { sha256FileAtPath, sha256Utf8Content } from "./sha256Content";
import { writeComponentInstalledIndex } from "./writeComponentInstalledIndex";
import { writeComponentVersionManifest } from "./writeComponentVersionManifest";
import { writeContentBlobToComponentStore } from "./writeContentBlobToComponentStore";

type HarnessManifestItemLike = {
  readonly id: string;
  readonly kind: string;
  readonly title: string;
  readonly path: string;
  readonly contentSha256?: string;
};

type HarnessManifestSetLike = {
  readonly version: number;
  readonly items: readonly HarnessManifestItemLike[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const persistHarnessSetVersionToComponentStore = (input: {
  readonly installDir: string;
  readonly harnessRootDir: string;
  readonly setSlug: string;
  readonly setEntry: HarnessManifestSetLike;
}): void => {
  const storePaths = resolveAgentWitchComponentStorePaths(input.installDir);
  const componentId = harnessSetComponentId(input.setSlug);
  const versionId = String(input.setEntry.version);
  const versionItems: ComponentVersionManifestItem[] = [];

  for (const item of input.setEntry.items) {
    if (!isRecord(item)) {
      continue;
    }

    const harnessItemPath =
      typeof item.path === "string" ? item.path.trim() : "";
    if (harnessItemPath.length === 0) {
      continue;
    }

    const absolutePath = path.join(input.harnessRootDir, harnessItemPath);
    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    const content = fs.readFileSync(absolutePath, "utf8");
    const contentSha256 =
      typeof item.contentSha256 === "string" && item.contentSha256.length > 0
        ? item.contentSha256
        : sha256FileAtPath(absolutePath);

    if (contentSha256 === null) {
      continue;
    }

    if (sha256Utf8Content(content) !== contentSha256) {
      throw new Error(
        `Harness item "${item.id}" failed content hash verification.`,
      );
    }

    writeContentBlobToComponentStore({
      storeDir: storePaths.storeDir,
      content,
    });

    versionItems.push({
      id: String(item.id),
      kind: String(item.kind),
      title: String(item.title),
      harnessItemPath,
      contentSha256,
    });
  }

  if (versionItems.length === 0) {
    return;
  }

  writeComponentVersionManifest(storePaths.versionsDir, {
    version: 1,
    componentId,
    versionId,
    items: versionItems,
    createdAt: new Date().toISOString(),
  });

  const installed = readComponentInstalledIndex(storePaths.installedFilePath);
  writeComponentInstalledIndex(storePaths.installedFilePath, {
    version: 1,
    components: {
      ...installed.components,
      [componentId]: {
        versionId,
        installedAt: new Date().toISOString(),
      },
    },
  });
};
