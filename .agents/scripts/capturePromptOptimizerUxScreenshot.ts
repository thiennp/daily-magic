import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import {
  PROMPT_OPTIMIZER_UX_BUNDLE,
  buildPromptOptimizerUxPageHtml,
  finishedWizardCycle,
} from "./promptOptimizerUxMockCycles";

const ARTIFACTS = "/opt/cursor/artifacts";

const main = async (): Promise<void> => {
  const bundle = PROMPT_OPTIMIZER_UX_BUNDLE;
  const cycle = finishedWizardCycle();
  const html = buildPromptOptimizerUxPageHtml({
    cycle,
    title: `Prompt optimizer — UX bundle ${bundle}`,
  });

  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const htmlPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}.html`,
  );
  const pngPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}.png`,
  );
  fs.writeFileSync(htmlPath, html);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 1400 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const history = document.getElementById("prompt-optimizer-history");
    if (history instanceof HTMLDetailsElement) {
      history.open = true;
    }
  });
  await page
    .locator("#prompt-optimizer-wizard-module-results")
    .scrollIntoViewIfNeeded();
  await page.locator("[data-sdlc-copy-wizard-modules]").click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: pngPath, fullPage: true });
  await context.close();
  await browser.close();

  console.log(`Wrote ${pngPath}`);
};

void main();
