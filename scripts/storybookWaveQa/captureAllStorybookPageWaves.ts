/**
 * Capture every catalog page (round 1). Requires Storybook static on STORYBOOK_BASE_URL.
 */
import { spawnSync } from "node:child_process";

import { STORYBOOK_WAVE_PAGES } from "./storybookWavePageCatalog";

const main = (): void => {
  for (const page of STORYBOOK_WAVE_PAGES) {
    const args = [
      "tsx",
      "scripts/storybookWaveQa/captureStorybookPageWave.ts",
      page.deployable,
      page.id,
      "1",
    ];
    const result = spawnSync("npx", args, {
      stdio: "inherit",
      env: process.env,
    });
    if (result.status !== 0) {
      process.stderr.write(
        `capture failed for ${page.deployable}/${page.id}\n`,
      );
      process.exit(result.status ?? 1);
    }
  }
};

main();
