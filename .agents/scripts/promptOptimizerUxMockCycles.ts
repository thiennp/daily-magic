import {
  createInitialPromptSdlcWizardState,
  summarizePromptSdlcWizardCompletion,
} from "../../apps/live/adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalArtifactDocument } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalArtifactDocument";
import { buildPromptSdlcLocalPageBody } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "../../apps/live/features/prompt-optimizer/internal/core/createPromptSdlcLocalCycle";

export const PROMPT_OPTIMIZER_UX_BUNDLE = "197";

export const promptOptimizerUxSharedForm = {
  goal: "Dogfood wizard UX bundle 197",
  prompt: "Verify the feature works (vague starter prompt)",
  modelNote: "Installed: Claude, Codex.",
  writers: [
    { id: "claude-cli", label: "Claude" },
    { id: "codex", label: "Codex" },
  ] as const,
  judge: "claude-cli",
  improver: "claude-cli",
  runner: "claude-cli",
  folder: "~/Projects/daily-magic",
  passScore: "90",
  maxRounds: "10",
  canRun: true,
  errorMessage: null as string | null,
};

export const finishedWizardCycle = (): ReturnType<
  typeof createPromptSdlcLocalCycle
> => {
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
          bestScore: 66,
          bestRound: 0,
          bestRunOutput: "Checklist output B",
          rounds: [
            {
              roundNumber: 0,
              score: 66,
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
      goal: promptOptimizerUxSharedForm.goal,
      sourcePrompt: promptOptimizerUxSharedForm.prompt,
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

export const inProgressWizardCycle = (): ReturnType<
  typeof createPromptSdlcLocalCycle
> => {
  const wizard = {
    ...createInitialPromptSdlcWizardState("Verify {{feature}} on Live"),
    gate: "optimize_modules" as const,
    phase: "optimize_modules" as const,
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
        status: "running" as const,
        selectedRevisionRound: null,
        statistics: {
          bestScore: null,
          bestRound: null,
          bestRunOutput: null,
          rounds: [],
        },
      },
    ],
  };
  return {
    ...createPromptSdlcLocalCycle({
      goal: promptOptimizerUxSharedForm.goal,
      sourcePrompt: promptOptimizerUxSharedForm.prompt,
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: "/tmp/project",
      wizard,
    }),
    id: "demo-wizard-running",
    status: "judging",
    updatedAt: new Date().toISOString(),
  };
};

export const promptOptimizerUxHistory = (): ReturnType<
  typeof createPromptSdlcLocalCycle
>[] => {
  const now = Date.now();
  const iso = (offsetMs: number): string =>
    new Date(now - offsetMs).toISOString();
  return [
    finishedWizardCycle(),
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

export const buildPromptOptimizerUxPageHtml = (input: {
  readonly cycle: ReturnType<typeof createPromptSdlcLocalCycle> | null;
  readonly title: string;
}): string => {
  const body = buildPromptSdlcLocalPageBody({
    ...promptOptimizerUxSharedForm,
    goal: input.cycle?.goal ?? promptOptimizerUxSharedForm.goal,
    prompt: promptOptimizerUxSharedForm.prompt,
    cycle: input.cycle,
    history: promptOptimizerUxHistory(),
  });
  return buildPromptSdlcLocalArtifactDocument({
    title: input.title,
    body,
  });
};
