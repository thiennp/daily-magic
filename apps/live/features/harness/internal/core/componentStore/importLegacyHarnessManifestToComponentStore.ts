import fs from "node:fs";

import { persistHarnessSetVersionToComponentStore } from "./persistHarnessSetVersionToComponentStore";
import { readComponentInstalledIndex } from "./readComponentInstalledIndex";
import { resolveAgentWitchComponentStorePaths } from "./resolveAgentWitchComponentStorePaths";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const importLegacyHarnessManifestToComponentStore = (input: {
  readonly installDir: string;
  readonly harnessRootDir: string;
  readonly harnessManifestPath: string;
}): void => {
  if (!fs.existsSync(input.harnessManifestPath)) {
    return;
  }

  const storePaths = resolveAgentWitchComponentStorePaths(input.installDir);
  const installed = readComponentInstalledIndex(storePaths.installedFilePath);
  if (Object.keys(installed.components).length > 0) {
    return;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(input.harnessManifestPath, "utf8"));
  } catch {
    return;
  }

  if (!isRecord(parsed) || parsed.version !== 1 || !isRecord(parsed.sets)) {
    return;
  }

  for (const [setSlug, setEntry] of Object.entries(parsed.sets)) {
    if (!isRecord(setEntry)) {
      continue;
    }

    const version = typeof setEntry.version === "number" ? setEntry.version : 1;
    const items = Array.isArray(setEntry.items) ? setEntry.items : [];

    persistHarnessSetVersionToComponentStore({
      installDir: input.installDir,
      harnessRootDir: input.harnessRootDir,
      setSlug,
      setEntry: { version, items },
    });
  }
};
