import {
  createInitialPromptSdlcWizardState,
  summarizePromptSdlcWizardCompletion,
} from "../../apps/live/adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalArtifactDocument } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalArtifactDocument";
import { buildPromptSdlcLocalPageBody } from "../../apps/live/features/prompt-optimizer/internal/core/buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "../../apps/live/features/prompt-optimizer/internal/core/createPromptSdlcLocalCycle";

export const PROMPT_OPTIMIZER_UX_BUNDLE = "198";

export const promptOptimizerUxSharedForm = {
  goal: "E2E: Prompt Optimizer wizard chain — {{feature}} on AWL with export + partial pass",
  prompt: `You are driving an AgentWitch Local verification run for {{feature}} in {{repo_root}}.

Acceptance (must all appear in module outputs):
1) Compose → Run wizard (generalize, evaluate ≥70, separate modules, optimize with runner evidence).
2) Partial pass is OK: at least one module may score below threshold if others compensate in the report.
3) Export Markdown module prompts and include {{acceptance_criteria}} for keyboard-only + screen-reader checks.
4) Do not conflate AWC (www.agentwitch.com) with CHECK24 daily-magic URLs unless explicitly asked.

Start from this weak instruction and improve it through the full 4-step wizard.`,
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
  const wizardSeed =
    "Verify {{feature}} in {{repo_root}} — {{acceptance_criteria}}";
  const wizard = {
    ...createInitialPromptSdlcWizardState(wizardSeed),
    gate: null,
    phase: "complete" as const,
    templatedPrompt:
      "Run AWL wizard for {{feature}}: generalize placeholders, evaluate ≥70, split modules, optimize with runner logs from {{repo_root}}.",
    modules: [
      {
        moduleId: "m1",
        title: "Codegen + SDLC checklist",
        prompt:
          "Module A: Verify {{feature}} — run unit tests, capture runner output, map to {{acceptance_criteria}}.",
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
        title: "UX + a11y review module",
        prompt:
          "Module B: Evaluate {{feature}} UX for keyboard-only flows; score against pass ≥70; cite gaps in {{acceptance_criteria}}.",
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
  const wizardSeed =
    "Verify {{feature}} in {{repo_root}} — {{acceptance_criteria}}";
  const wizard = {
    ...createInitialPromptSdlcWizardState(wizardSeed),
    gate: "optimize_modules" as const,
    phase: "optimize_modules" as const,
    templatedPrompt:
      "Run AWL wizard for {{feature}}: generalize placeholders, evaluate ≥70, split modules, optimize with runner logs from {{repo_root}}.",
    modules: [
      {
        moduleId: "m1",
        title: "Codegen + SDLC checklist",
        prompt:
          "Module A: Verify {{feature}} — run unit tests, capture runner output, map to {{acceptance_criteria}}.",
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
        title: "UX + a11y review module",
        prompt:
          "Module B: Evaluate {{feature}} UX for keyboard-only flows; score against pass ≥70; cite gaps in {{acceptance_criteria}}.",
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
        goal: "Legacy loop sample",
        sourcePrompt: "Fix tests",
        judgeModel: "codex",
        improverModel: "codex",
        workingDirectory: "/tmp",
      }),
      id: "hist-legacy",
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
