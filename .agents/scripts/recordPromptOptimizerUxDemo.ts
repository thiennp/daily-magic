import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

import {
  createInitialPromptSdlcWizardState,
  summarizePromptSdlcWizardCompletion,
} from "../../apps/live/adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalArtifactDocument } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalArtifactDocument";
import { buildPromptSdlcLocalPageBody } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "../../apps/live/features/prompt-optimizer/internal/core/createPromptSdlcLocalCycle";

const ARTIFACTS = "/opt/cursor/artifacts";
const BUNDLE = "195";

const finishedWizard = (): ReturnType<typeof createPromptSdlcLocalCycle> => {
  const wizard = {
    ...createInitialPromptSdlcWizardState("Verify {{feature}} on Live"),
    gate: null,
    phase: "complete" as const,
    templatedPrompt: "Verify {{feature}} on Live",
    modules: [
      {
        moduleId: "m1",
        title: "Generalize checklist",
        prompt: "Check {{feature}}",
        status: "passed" as const,
        selectedRevisionRound: null,
        statistics: {
          bestScore: 82,
          bestRound: 0,
          bestRunOutput: "Checklist output A",
          rounds: [
            {
              roundNumber: 0,
              score: 82,
              passed: true,
              runOutput: "Checklist output A",
              tokens: 240,
            },
          ],
        },
      },
      {
        moduleId: "m2",
        title: "Evaluate flow",
        prompt: "Evaluate {{feature}}",
        status: "passed" as const,
        selectedRevisionRound: null,
        statistics: {
          bestScore: 78,
          bestRound: 0,
          bestRunOutput: "Checklist output B",
          rounds: [
            {
              roundNumber: 0,
              score: 78,
              passed: true,
              runOutput: "Checklist output B",
              tokens: 190,
            },
          ],
        },
      },
    ],
  };
  summarizePromptSdlcWizardCompletion(wizard);
  return {
    ...createPromptSdlcLocalCycle({
      goal: "Dogfood wizard UX bundle 195",
      sourcePrompt: "Weak prompt",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: "/tmp/project",
      wizard,
    }),
    id: "screenshot-wizard-finished",
    status: "stopped",
    updatedAt: new Date().toISOString(),
  };
};

const main = async (): Promise<void> => {
  const cycle = finishedWizard();
  const body = buildPromptSdlcLocalPageBody({
    goal: "",
    prompt: "",
    modelNote: "Installed: Claude, Codex.",
    writers: [
      { id: "claude-cli", label: "Claude" },
      { id: "codex", label: "Codex" },
    ],
    judge: "claude-cli",
    improver: "claude-cli",
    runner: "claude-cli",
    folder: "~/Projects/daily-magic",
    passScore: "90",
    maxRounds: "10",
    canRun: true,
    errorMessage: null,
    cycle,
    history: [cycle],
  });

  const html = buildPromptSdlcLocalArtifactDocument({
    title: `Prompt optimizer — UX bundle ${BUNDLE} demo`,
    body,
  });

  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const htmlPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${BUNDLE}.html`,
  );
  fs.writeFileSync(htmlPath, html);

  const browser = await chromium.launch({
    headless: false,
    slowMo: 350,
    args: ["--start-maximized"],
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
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
  await page.waitForTimeout(1200);
  await page
    .locator("#prompt-optimizer-wizard-module-results")
    .scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const copyAll = page.locator("[data-sdlc-copy-wizard-modules]");
  await copyAll.click();
  await page.waitForTimeout(2200);
  await page.locator("[data-sdlc-copy-module-prompt]").first().click();
  await page.waitForTimeout(2200);
  await browser.close();
};

void main();
