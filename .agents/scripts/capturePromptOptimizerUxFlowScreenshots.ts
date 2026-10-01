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

const shot = async (
  page: import("playwright").Page,
  slug: string,
  bundle: string,
): Promise<string> => {
  const filePath = path.join(
    ARTIFACTS,
    `prompt-optimizer-flow-${bundle}-${slug}.png`,
  );
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Wrote ${filePath}`);
  return filePath;
};

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

  fs.writeFileSync(
    composePath,
    buildPromptOptimizerUxPageHtml({
      cycle: null,
      title: `Prompt optimizer — UX flow audit ${bundle}`,
    }),
  );
  fs.writeFileSync(
    runningPath,
    buildPromptOptimizerUxPageHtml({
      cycle: inProgressWizardCycle(),
      title: `Prompt optimizer — UX flow running ${bundle}`,
    }),
  );
  fs.writeFileSync(
    completePath,
    buildPromptOptimizerUxPageHtml({
      cycle: finishedWizardCycle(),
      title: `Prompt optimizer — UX flow complete ${bundle}`,
    }),
  );

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  const paths: string[] = [];

  await page.goto(`file://${composePath}`, { waitUntil: "networkidle" });
  paths.push(await shot(page, "01-compose-collapsed", bundle));

  await page.evaluate(() => {
    const compose = document.getElementById("prompt-optimizer-compose-details");
    if (compose instanceof HTMLDetailsElement) compose.open = true;
  });
  await page.waitForTimeout(400);
  paths.push(await shot(page, "02-compose-expanded-empty", bundle));

  await page
    .locator('textarea[name="prompt"]')
    .fill(promptOptimizerUxSharedForm.prompt);
  const goalField = page.locator('input[name="goal"], textarea[name="goal"]');
  if ((await goalField.count()) > 0) {
    await goalField.first().fill(promptOptimizerUxSharedForm.goal);
  }
  await page.waitForTimeout(300);
  paths.push(await shot(page, "03-compose-filled-ready", bundle));

  await page.goto(`file://${runningPath}`, { waitUntil: "networkidle" });
  await page.locator("#prompt-optimizer-run").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  paths.push(await shot(page, "04-running-in-progress-header", bundle));

  await page.locator(".sdlc-run-panel-timeline").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  paths.push(await shot(page, "05-running-progress-step4", bundle));

  await page.goto(`file://${completePath}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  paths.push(await shot(page, "06-complete-finished-banner", bundle));

  await page
    .locator("#prompt-optimizer-wizard-module-results")
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  paths.push(await shot(page, "07-complete-module-table", bundle));

  await page.locator("[data-sdlc-copy-wizard-modules]").click();
  await page.waitForTimeout(500);
  paths.push(await shot(page, "08-complete-copy-all-toast", bundle));

  await page.locator("[data-sdlc-copy-module-prompt]").first().click();
  await page.waitForTimeout(400);
  paths.push(await shot(page, "09-complete-copy-one-prompt", bundle));

  await page.evaluate(() => {
    const history = document.getElementById("prompt-optimizer-history");
    if (history instanceof HTMLDetailsElement) history.open = true;
  });
  await page.waitForTimeout(400);
  paths.push(await shot(page, "10-history-list", bundle));

  await page
    .locator(
      "#prompt-optimizer-wizard-outcome .sdlc-wizard-outcome-step summary",
    )
    .first()
    .click();
  await page.waitForTimeout(400);
  paths.push(await shot(page, "11-complete-pipeline-step1-open", bundle));

  await context.close();
  await browser.close();

  fs.writeFileSync(
    path.join(ARTIFACTS, `prompt-optimizer-flow-${bundle}-manifest.json`),
    JSON.stringify(
      { bundle, prompt: promptOptimizerUxSharedForm, paths },
      null,
      2,
    ),
  );
};

void main();
