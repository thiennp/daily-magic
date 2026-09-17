import fs from "node:fs";
import path from "node:path";

import type { ComponentVersionManifest } from "./componentStore.types";

export const readComponentVersionManifest = (input: {
  readonly versionsDir: string;
  readonly componentId: string;
  readonly versionId: string;
}): ComponentVersionManifest | null => {
  const safeComponentId = input.componentId.replaceAll("/", "_");
  const targetPath = path.join(
    input.versionsDir,
    safeComponentId,
    `${input.versionId}.json`,
  );

  if (!fs.existsSync(targetPath)) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(targetPath, "utf8"));
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      (parsed as { version?: unknown }).version === 1
    ) {
      return parsed as ComponentVersionManifest;
    }
  } catch {
    return null;
  }

  return null;
};
