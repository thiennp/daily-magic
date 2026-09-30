import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import {
  PROMPT_OPTIMIZER_UX_BUNDLE,
  buildPromptOptimizerUxPageHtml,
  finishedWizardCycle,
  inProgressWizardCycle,
  promptOptimizerUxSharedForm,
} from "./promptOptimizerUxMockCycles";

const ARTIFACTS = "/opt/cursor/artifacts";

const main = async (): Promise<void> => {
  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const bundle = PROMPT_OPTIMIZER_UX_BUNDLE;
  const composePath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}-flow-compose.html`,
  );
  const runningPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}-flow-running.html`,
  );
  const completePath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}-flow-complete.html`,
  );
  const videoPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${bundle}-demo.mp4`,
  );

  fs.writeFileSync(
    composePath,
    buildPromptOptimizerUxPageHtml({
      cycle: null,
      title: `Prompt optimizer — UX bundle ${bundle} compose`,
    }),
  );
  fs.writeFileSync(
    runningPath,
    buildPromptOptimizerUxPageHtml({
      cycle: inProgressWizardCycle(),
      title: `Prompt optimizer — UX bundle ${bundle} running`,
    }),
  );
  fs.writeFileSync(
    completePath,
    buildPromptOptimizerUxPageHtml({
      cycle: finishedWizardCycle(),
      title: `Prompt optimizer — UX bundle ${bundle} complete`,
    }),
  );

  const browser = await chromium.launch({ headless: true, slowMo: 220 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
    recordVideo: { dir: ARTIFACTS, size: { width: 1280, height: 900 } },
  });
  const page = await context.newPage();

  await page.goto(`file://${composePath}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const compose = document.getElementById("prompt-optimizer-compose-details");
    if (compose instanceof HTMLDetailsElement) compose.open = true;
  });
  await page.waitForTimeout(800);
  const promptField = page.locator('textarea[name="prompt"]');
  await promptField.click();
  await promptField.fill(promptOptimizerUxSharedForm.prompt);
  const goalField = page.locator('input[name="goal"], textarea[name="goal"]');
  if ((await goalField.count()) > 0) {
    await goalField.first().fill(promptOptimizerUxSharedForm.goal);
  }
  await page.waitForTimeout(600);
  await page.locator("[data-sdlc-run-wizard]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);

  await page.goto(`file://${runningPath}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.locator("#prompt-optimizer-run").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  await page.locator(".sdlc-run-panel-timeline").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);

  await page.goto(`file://${completePath}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.evaluate(() => {
    const history = document.getElementById("prompt-optimizer-history");
    if (history instanceof HTMLDetailsElement) history.open = true;
  });
  await page.waitForTimeout(700);
  await page.waitForTimeout(900);
  await page
    .locator("#prompt-optimizer-wizard-module-results")
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.locator("[data-sdlc-copy-wizard-modules]").click();
  await page.waitForTimeout(2400);
  await page.locator("[data-sdlc-copy-module-prompt]").first().click();
  await page.waitForTimeout(2000);
  await page
    .locator(
      "#prompt-optimizer-wizard-outcome .sdlc-wizard-outcome-step summary",
    )
    .first()
    .click();
  await page.waitForTimeout(1500);

  const video = page.video();
  await page.close();
  await context.close();
  if (video !== null) {
    await video.saveAs(videoPath);
  }
  await browser.close();
  console.log(`Wrote ${videoPath}`);
};

void main();
