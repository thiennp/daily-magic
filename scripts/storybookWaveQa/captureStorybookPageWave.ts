/**
 * Capture Storybook screenshots for one page wave (all statuses).
 * Usage: tsx scripts/storybookWaveQa/captureStorybookPageWave.ts AWC home-marketing [round]
 */
import fs from "node:fs";
import path from "node:path";

import { chromium, type Browser } from "playwright";

import {
  buildStorybookStoryId,
  type StorybookWaveDeployable,
  STORYBOOK_WAVE_PAGES,
  storybookStoryUrl,
} from "./storybookWavePageCatalog";

const ARTIFACTS_ROOT =
  process.env.STORYBOOK_WAVE_OUTPUT_DIR?.trim() ||
  "/opt/cursor/artifacts/storybook-waves";
const STORYBOOK_BASE =
  process.env.STORYBOOK_BASE_URL?.trim() || "http://127.0.0.1:6008";

const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

const parseArgs = (): {
  deployable: StorybookWaveDeployable;
  pageId: string;
  round: number;
} => {
  const deployable = process.argv[2]?.trim();
  const pageId = process.argv[3]?.trim();
  const round = Number.parseInt(process.argv[4] ?? "1", 10);
  if (deployable !== "AWC" && deployable !== "AWL") {
    throw new Error(
      "Usage: captureStorybookPageWave.ts AWC|AWL <pageId> [round]",
    );
  }
  if (pageId === undefined || pageId.length === 0) {
    throw new Error("Missing pageId");
  }
  return { deployable, pageId, round: Number.isFinite(round) ? round : 1 };
};

const findPage = (deployable: StorybookWaveDeployable, pageId: string) => {
  const page = STORYBOOK_WAVE_PAGES.find(
    (entry) => entry.deployable === deployable && entry.id === pageId,
  );
  if (page === undefined) {
    throw new Error(`Unknown page ${deployable}/${pageId}`);
  }
  return page;
};

const waitForStoryCanvas = async (
  browser: Browser,
  storyUrl: string,
  outfile: string,
  viewport: { width: number; height: number },
  status: string,
): Promise<void> => {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(storyUrl, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.waitForTimeout(status === "loading" ? 2500 : 5500);
  await page.locator(".sb-show-errordisplay").waitFor({
    state: "hidden",
    timeout: 90_000,
  });
  await page.locator("#storybook-root").waitFor({
    state: "visible",
    timeout: 90_000,
  });
  await page.screenshot({ path: outfile, fullPage: true });
  await context.close();
};

const main = async (): Promise<void> => {
  const { deployable, pageId, round } = parseArgs();
  const wavePage = findPage(deployable, pageId);
  const outDir = path.join(
    ARTIFACTS_ROOT,
    deployable,
    pageId,
    `round-${round}`,
  );
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const viewports =
    deployable === "AWC"
      ? (["desktop", "mobile"] as const)
      : (["desktop"] as const);

  const manifest: {
    deployable: string;
    pageId: string;
    round: number;
    captures: Array<{
      status: string;
      viewport: string;
      file: string;
      storyId: string;
    }>;
  } = {
    deployable,
    pageId,
    round,
    captures: [],
  };

  for (const status of wavePage.statuses) {
    const storyId = buildStorybookStoryId(deployable, pageId, status);
    const storyUrl = storybookStoryUrl(STORYBOOK_BASE, storyId);
    for (const viewportName of viewports) {
      const viewport = VIEWPORTS[viewportName];
      const fileName = `${status}-${viewportName}.png`;
      const outfile = path.join(outDir, fileName);
      await waitForStoryCanvas(browser, storyUrl, outfile, viewport, status);
      manifest.captures.push({
        status,
        viewport: viewportName,
        file: outfile,
        storyId,
      });
      process.stdout.write(`captured ${storyId} ${viewportName}\n`);
    }
  }

  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  await browser.close();
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
