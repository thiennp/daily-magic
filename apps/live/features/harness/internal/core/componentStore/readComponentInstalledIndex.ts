import fs from "node:fs";

import type { ComponentInstalledIndex } from "./componentStore.types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readComponentInstalledIndex = (
  installedFilePath: string,
): ComponentInstalledIndex => {
  if (!fs.existsSync(installedFilePath)) {
    return { version: 1, components: {} };
  }

  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(installedFilePath, "utf8"),
    );
    if (
      isRecord(parsed) &&
      parsed.version === 1 &&
      isRecord(parsed.components)
    ) {
      return {
        version: 1,
        components: parsed.components as ComponentInstalledIndex["components"],
      };
    }
  } catch {
    return { version: 1, components: {} };
  }

  return { version: 1, components: {} };
};
