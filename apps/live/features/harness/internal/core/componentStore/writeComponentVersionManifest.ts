import fs from "node:fs";
import path from "node:path";

import type { ComponentVersionManifest } from "./componentStore.types";

export const writeComponentVersionManifest = (
  versionsDir: string,
  manifest: ComponentVersionManifest,
): void => {
  const safeComponentId = manifest.componentId.replaceAll("/", "_");
  const targetDir = path.join(versionsDir, safeComponentId);
  const targetPath = path.join(targetDir, `${manifest.versionId}.json`);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(manifest, null, 2)}\n`);
};
