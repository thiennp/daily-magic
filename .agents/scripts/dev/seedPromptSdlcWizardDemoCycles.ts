#!/usr/bin/env tsx
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { createInitialPromptSdlcWizardState } from "../../../apps/live/adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "../../../apps/live/features/prompt-sdlc/internal/core/createPromptSdlcLocalCycle";
import { savePromptSdlcLocalCycle } from "../../../apps/live/features/prompt-sdlc/internal/core/promptSdlcLocalStore";

const installDir =
  process.env.AWL_DEMO_INSTALL_DIR?.trim() ||
  path.join("/opt/cursor/artifacts", "awl-wizard-demo");

fs.mkdirSync(installDir, { recursive: true });
for (const sub of ["logs", "harness/sets", "projects", "app"]) {
  fs.mkdirSync(path.join(installDir, sub), { recursive: true });
}

const bundle = path.join(
  process.cwd(),
  "public/install/agent-witch/app/agent-witch.js",
);
if (fs.existsSync(bundle)) {
  fs.copyFileSync(bundle, path.join(installDir, "app/agent-witch.js"));
}

const storePath = path.join(installDir, "prompt-sdlc-cycles.json");
const goal = "Reply to support email using only approved facts.";

const step1 = {
  ...createPromptSdlcLocalCycle({
    goal,
    sourcePrompt: "Be helpful.",
    judgeModel: "cursor",
    improverModel: "cursor",
    runnerModel: "cursor",
    workingDirectory: installDir,
    wizard: {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      gate: "generalize",
      phase: "generalize",
      templatedPrompt: "Help the customer with {{issue}} using {{policy}}.",
      variables: [
        {
          name: "issue",
          description: "What the customer asked",
          sampleValue: "billing question",
        },
        {
          name: "policy",
          description: "Approved facts",
          sampleValue: "refund within 14 days",
        },
      ],
    },
  }),
  id: "demo-wizard-step-1-generalize",
  status: "wizard_paused" as const,
};

const step2 = {
  ...createPromptSdlcLocalCycle({
    goal,
    sourcePrompt:
      "Help the customer with billing question using refund within 14 days.",
    judgeModel: "cursor",
    improverModel: "cursor",
    runnerModel: "cursor",
    workingDirectory: installDir,
    passScore: 70,
    maxRounds: 5,
    wizard: {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      phase: "evaluate",
      gate: "evaluate",
      templatedPrompt: "Help the customer with {{issue}} using {{policy}}.",
      variables: [
        {
          name: "issue",
          description: "What the customer asked",
          sampleValue: "billing question",
        },
        {
          name: "policy",
          description: "Approved facts",
          sampleValue: "refund within 14 days",
        },
      ],
      evaluateSelectedRound: 0,
    },
  }),
  id: "demo-wizard-step-2-evaluate",
  status: "wizard_paused" as const,
  revisions: [
    {
      roundNumber: 0,
      promptText:
        "Help the customer with billing question using refund within 14 days.",
      judgement: {
        score: 88,
        passed: true,
        reasons: "Answers the question without inventing policy.",
        rawReply: "88",
        tokens: 120,
      },
    },
  ],
};

const step3 = {
  ...step2,
  id: "demo-wizard-step-3-separate",
  status: "wizard_paused" as const,
  wizard: {
    ...step2.wizard!,
    phase: "separate",
    gate: "separate",
    splitOptions: [
      {
        id: "one",
        title: "Single module",
        summary: "One prompt for the whole flow",
        topology: "chain",
        recommended: true,
        modules: [
          {
            id: "m1",
            title: "Support reply",
            prompt: "Draft reply for {{issue}}",
            order: 0,
          },
        ],
      },
      {
        id: "two",
        title: "Triage + reply",
        summary: "Classify then respond",
        topology: "parallel",
        recommended: false,
        modules: [
          {
            id: "m1",
            title: "Triage",
            prompt: "Classify {{issue}}",
            order: 0,
          },
          {
            id: "m2",
            title: "Reply",
            prompt: "Reply using {{policy}}",
            order: 1,
          },
        ],
      },
    ],
  },
};

const step4 = {
  ...step3,
  id: "demo-wizard-step-4-optimize",
  status: "wizard_paused" as const,
  wizard: {
    ...step3.wizard!,
    phase: "optimize_modules",
    gate: "optimize_modules",
    selectedSplitOptionId: "one",
    modules: [
      {
        moduleId: "m1",
        title: "Support reply",
        prompt: "Draft reply for {{issue}} using {{policy}}.",
        status: "passed" as const,
        selectedRevisionRound: 0,
      },
    ],
    currentModuleIndex: 0,
  },
  revisions: [
    {
      roundNumber: 0,
      promptText:
        "Draft reply for billing question using refund within 14 days.",
      judgement: {
        score: 92,
        passed: true,
        reasons: "Clear and policy-safe.",
        rawReply: "92",
        tokens: 80,
      },
    },
  ],
};

const finalResult = {
  ...step4,
  id: "demo-wizard-final-passed",
  status: "passed" as const,
  errorMessage: null,
  wizard: {
    ...step4.wizard!,
    phase: "complete",
    gate: null,
  },
};

for (const cycle of [step1, step2, step3, step4, finalResult]) {
  savePromptSdlcLocalCycle(storePath, cycle);
}

const manifest = {
  installDir,
  port: 43347,
  cycles: [
    { step: 1, label: "Generalize gate", id: step1.id },
    { step: 2, label: "Evaluate gate", id: step2.id },
    { step: 3, label: "Separate gate", id: step3.id },
    { step: 4, label: "Optimize gate", id: step4.id },
    { step: 5, label: "Final passed", id: finalResult.id },
  ],
};
fs.writeFileSync(
  path.join(installDir, "demo-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(JSON.stringify(manifest, null, 2));
