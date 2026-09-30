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
const BUNDLE = "192";

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
      goal: "Dogfood wizard UX bundle 192",
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

const history = (): ReturnType<typeof createPromptSdlcLocalCycle>[] => {
  const now = Date.now();
  const iso = (offsetMs: number): string =>
    new Date(now - offsetMs).toISOString();
  return [
    finishedWizard(),
    {
      ...createPromptSdlcLocalCycle({
        goal: "Classic loop sample",
        sourcePrompt: "Fix tests",
        judgeModel: "codex",
        improverModel: "codex",
        workingDirectory: "/tmp",
      }),
      id: "hist-classic",
      status: "passed",
      currentRound: 3,
      updatedAt: iso(1000 * 60 * 45),
    },
    {
      ...createPromptSdlcLocalCycle({
        goal: "Paused wizard run",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "evaluate",
          phase: "evaluate",
        },
      }),
      id: "hist-wizard-paused",
      status: "wizard_paused",
      currentRound: 0,
      updatedAt: iso(1000 * 60 * 60 * 5),
    },
  ];
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
    history: history(),
  });

  const html = buildPromptSdlcLocalArtifactDocument({
    title: `Prompt optimizer — UX bundle ${BUNDLE}`,
    body,
  });

  fs.mkdirSync(ARTIFACTS, { recursive: true });
  const htmlPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${BUNDLE}.html`,
  );
  const pngPath = path.join(
    ARTIFACTS,
    `prompt-optimizer-ux-bundle-${BUNDLE}.png`,
  );
  fs.writeFileSync(htmlPath, html);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 1400 },
  });
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const history = document.getElementById("prompt-optimizer-history");
    if (history instanceof HTMLDetailsElement) {
      history.open = true;
    }
  });
  await page.screenshot({ path: pngPath, fullPage: true });
  await browser.close();

  console.log(`Wrote ${pngPath}`);
};

void main();
