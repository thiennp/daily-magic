import fs from "node:fs";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { harnessSetComponentId } from "./componentStore.constants";
import { importLegacyHarnessManifestToComponentStore } from "./importLegacyHarnessManifestToComponentStore";
import { readComponentVersionManifest } from "./readComponentVersionManifest";
import { resolveAgentWitchComponentStorePaths } from "./resolveAgentWitchComponentStorePaths";
import { sha256FileAtPath } from "./sha256Content";

export const resolveHarnessItemSourceAbsolutePath = (input: {
  readonly layout: AgentWitchLocalLayout;
  readonly setSlug: string;
  readonly setVersion: number;
  readonly manifestItemPath: string;
  readonly manifestItemId: string;
}): string | null => {
  importLegacyHarnessManifestToComponentStore({
    installDir: input.layout.installDir,
    harnessRootDir: input.layout.harnessRootDir,
    harnessManifestPath: input.layout.harnessManifestPath,
  });

  const storePaths = resolveAgentWitchComponentStorePaths(
    input.layout.installDir,
  );
  const componentId = harnessSetComponentId(input.setSlug);
  const versionManifest = readComponentVersionManifest({
    versionsDir: storePaths.versionsDir,
    componentId,
    versionId: String(input.setVersion),
  });

  if (versionManifest !== null) {
    const item = versionManifest.items.find(
      (candidate) => candidate.id === input.manifestItemId,
    );
    if (item !== undefined) {
      const blobPath = path.join(storePaths.storeDir, item.contentSha256);
      if (fs.existsSync(blobPath)) {
        const blobHash = sha256FileAtPath(blobPath);
        if (blobHash === item.contentSha256) {
          return blobPath;
        }
      }
    }
  }

  const trimmed = input.manifestItemPath.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const legacyPath = trimmed.startsWith("shared/")
    ? path.join(input.layout.harnessRootDir, trimmed)
    : path.join(input.layout.harnessSetsDir, input.setSlug, trimmed);

  if (!fs.existsSync(legacyPath)) {
    return null;
  }

  try {
    const stat = fs.statSync(legacyPath);
    if (!stat.isFile()) {
      return null;
    }
  } catch {
    return null;
  }

  return legacyPath;
};
