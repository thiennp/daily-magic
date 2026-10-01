/**
 * Fail if any catalog story shows Storybook error overlay.
 * Usage: STORYBOOK_BASE_URL=http://127.0.0.1:6008 npx tsx scripts/storybookWaveQa/validateAllStorybookStories.ts
 */
import { chromium } from "playwright";

import {
  buildStorybookStoryId,
  STORYBOOK_WAVE_PAGES,
  storybookStoryUrl,
} from "./storybookWavePageCatalog";

const BASE = process.env.STORYBOOK_BASE_URL?.trim() || "http://127.0.0.1:6008";

const main = async (): Promise<void> => {
  const browser = await chromium.launch({ headless: true });
  const failures: string[] = [];

  for (const page of STORYBOOK_WAVE_PAGES) {
    for (const status of page.statuses) {
      const storyId = buildStorybookStoryId(page.deployable, page.id, status);
      const url = storybookStoryUrl(BASE, storyId);
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
      });
      const pw = await context.newPage();
      try {
        await pw.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 120_000,
        });
        await pw.waitForTimeout(status === "loading" ? 2500 : 5500);
        const hasError = await pw.locator(".sb-show-errordisplay").count();
        if (hasError > 0) {
          const text = await pw
            .locator(".sb-errordisplay_main")
            .textContent()
            .catch(() => "");
          failures.push(
            `${page.deployable}/${page.id}/${status}: ${text?.slice(0, 200)}`,
          );
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${page.deployable}/${page.id}/${status}: ${message}`);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();

  if (failures.length > 0) {
    process.stderr.write(`Storybook render failures (${failures.length}):\n`);
    for (const line of failures) {
      process.stderr.write(`  - ${line}\n`);
    }
    process.exit(1);
  }
  process.stdout.write(
    `All ${STORYBOOK_WAVE_PAGES.length} page stories rendered without error overlay.\n`,
  );
};

main().catch((error: unknown) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
});
