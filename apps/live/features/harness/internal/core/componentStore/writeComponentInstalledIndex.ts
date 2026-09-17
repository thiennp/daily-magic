import fs from "node:fs";
import path from "node:path";

import type { ComponentInstalledIndex } from "./componentStore.types";

export const writeComponentInstalledIndex = (
  installedFilePath: string,
  index: ComponentInstalledIndex,
): void => {
  fs.mkdirSync(path.dirname(installedFilePath), { recursive: true });
  fs.writeFileSync(installedFilePath, `${JSON.stringify(index, null, 2)}\n`);
};
