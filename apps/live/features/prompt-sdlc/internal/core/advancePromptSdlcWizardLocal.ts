import {
  buildPromptSdlcGeneralizePrompt,
  buildPromptSdlcSeparatePrompt,
  isPromptSdlcTerminalStatus,
  parsePromptSdlcGeneralizeReply,
  parsePromptSdlcSeparateReply,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
  readPromptSdlcWizardEvaluatePromptText,
  readPromptSdlcWizardTemplatedOrConcrete,
  recordPromptSdlcWizardAttempt,
  selectPromptSdlcBestPrompt,
} from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";
import { advancePromptSdlcLocalCycle } from "./advancePromptSdlcLocalCycle";

const failCycle = (
  cycle: PromptSdlcLocalCycle,
  errorMessage: string,
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "failed",
  errorMessage,
  updatedAt: new Date().toISOString(),
});

const pauseAtGate = (
  cycle: PromptSdlcLocalCycle,
  gate: NonNullable<PromptSdlcLocalCycle["wizard"]>["gate"],
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "wizard_paused",
  wizard:
    cycle.wizard === undefined
      ? undefined
      : {
          ...cycle.wizard,
          gate,
        },
  updatedAt: new Date().toISOString(),
});

const writerForWizard = (cycle: PromptSdlcLocalCycle): string | null => {
  if (cycle.judgeModel !== PROMPT_SDLC_MANUAL_ACTOR) {
    return cycle.judgeModel;
  }
  if (cycle.improverModel !== PROMPT_SDLC_MANUAL_ACTOR) {
    return cycle.improverModel;
  }
  return null;
};

const lastAttemptSummaryForStep = (
  cycle: PromptSdlcLocalCycle,
  step: "generalize" | "separate",
): string => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return "";
  }
  const attempts = wizard.attempts.filter((item) => item.step === step);
  const last = attempts.at(-1);
  if (last === undefined) {
    return "";
  }
  return JSON.stringify(last.output);
};

const runGeneralize = async (
  cycle: PromptSdlcLocalCycle,
  signal?: AbortSignal,
  onWriterFailure?: (writer: string) => void,
): Promise<PromptSdlcLocalCycle> => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const writer = writerForWizard(cycle);
  if (writer === null) {
    return failCycle(cycle, "Choose a writer to run generalization.");
  }
  const sourcePrompt =
    cycle.revisions[0]?.promptText ??
    readPromptSdlcWizardTemplatedOrConcrete(wizard);
  const prompt = buildPromptSdlcGeneralizePrompt({
    goal: cycle.goal,
    sourcePrompt,
    avoid: wizard.avoidByStep.generalize,
    stepInstructions: wizard.pendingStepInstructions,
    lastAttemptSummary: lastAttemptSummaryForStep(cycle, "generalize"),
  });
  const reply = await runPromptSdlcWriterReply({
    writerAgent: writer,
    prompt,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    signal,
  });
  if (!reply.ok) {
    onWriterFailure?.(writer);
    return failCycle(cycle, reply.errorMessage);
  }
  try {
    const parsed = parsePromptSdlcGeneralizeReply(reply.text);
    const nextWizard = recordPromptSdlcWizardAttempt({
      wizard: {
        ...wizard,
        templatedPrompt: parsed.templatedPrompt,
        variables: parsed.variables,
      },
      step: "generalize",
      output: parsed,
      userFeedback: null,
      stepInstructions:
        wizard.pendingStepInstructions.trim().length === 0
          ? null
          : wizard.pendingStepInstructions,
    });
    return pauseAtGate(
      {
        ...cycle,
        wizard: nextWizard,
      },
      "generalize",
    );
  } catch (error) {
    return failCycle(
      cycle,
      error instanceof Error ? error.message : "Could not read generalization.",
    );
  }
};

const runSeparate = async (
  cycle: PromptSdlcLocalCycle,
  signal?: AbortSignal,
  onWriterFailure?: (writer: string) => void,
): Promise<PromptSdlcLocalCycle> => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const writer = writerForWizard(cycle);
  if (writer === null) {
    return failCycle(cycle, "Choose a writer to suggest splits.");
  }
  const evaluateHandoffPrompt = readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  });
  const prompt = buildPromptSdlcSeparatePrompt({
    goal: cycle.goal,
    templatedPrompt: evaluateHandoffPrompt,
    avoid: wizard.avoidByStep.separate,
    stepInstructions: wizard.pendingStepInstructions,
    lastAttemptSummary: lastAttemptSummaryForStep(cycle, "separate"),
  });
  const reply = await runPromptSdlcWriterReply({
    writerAgent: writer,
    prompt,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    signal,
  });
  if (!reply.ok) {
    onWriterFailure?.(writer);
    return failCycle(cycle, reply.errorMessage);
  }
  try {
    const options = parsePromptSdlcSeparateReply(reply.text);
    const nextWizard = recordPromptSdlcWizardAttempt({
      wizard: {
        ...wizard,
        splitOptions: options,
      },
      step: "separate",
      output: { options },
      userFeedback: null,
      stepInstructions:
        wizard.pendingStepInstructions.trim().length === 0
          ? null
          : wizard.pendingStepInstructions,
    });
    return pauseAtGate(
      {
        ...cycle,
        wizard: nextWizard,
      },
      "separate",
    );
  } catch (error) {
    return failCycle(
      cycle,
      error instanceof Error ? error.message : "Could not read split options.",
    );
  }
};

export const beginPromptSdlcWizardEvaluate = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const concrete = readPromptSdlcWizardTemplatedOrConcrete(wizard);
  const now = new Date().toISOString();
  return {
    ...cycle,
    status: "judging",
    judgeScoresOnly: false,
    currentRound: 0,
    passScore: PROMPT_SDLC_WIZARD_PASS_SCORE,
    maxRounds: PROMPT_SDLC_WIZARD_MAX_ROUNDS,
    errorMessage: null,
    revisions: [{ roundNumber: 0, promptText: concrete, judgement: null }],
    wizard: {
      ...wizard,
      phase: "evaluate",
      gate: null,
    },
    updatedAt: now,
  };
};

export const beginPromptSdlcWizardModuleEvaluate = (
  cycle: PromptSdlcLocalCycle,
  moduleIndex: number,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const moduleRun = wizard.modules[moduleIndex];
  if (moduleRun === undefined) {
    return failCycle(cycle, "This module is missing.");
  }
  const concrete = readPromptSdlcWizardTemplatedOrConcrete({
    ...wizard,
    templatedPrompt: moduleRun.prompt,
  });
  const runner =
    cycle.runnerModel !== undefined &&
    cycle.runnerModel !== PROMPT_SDLC_MANUAL_ACTOR
      ? cycle.runnerModel
      : cycle.judgeModel !== PROMPT_SDLC_MANUAL_ACTOR
        ? cycle.judgeModel
        : cycle.improverModel;
  const now = new Date().toISOString();
  return {
    ...cycle,
    status: "judging",
    judgeScoresOnly: true,
    runnerModel: runner,
    currentRound: 0,
    passScore: PROMPT_SDLC_WIZARD_PASS_SCORE,
    maxRounds: PROMPT_SDLC_WIZARD_MAX_ROUNDS,
    errorMessage: null,
    revisions: [{ roundNumber: 0, promptText: concrete, judgement: null }],
    wizard: {
      ...wizard,
      phase: "optimize_modules",
      gate: null,
      currentModuleIndex: moduleIndex,
      modules: wizard.modules.map((item, index) =>
        index === moduleIndex ? { ...item, status: "running" } : item,
      ),
    },
    updatedAt: now,
  };
};

export const advancePromptSdlcWizardLocal = async (
  cycle: PromptSdlcLocalCycle,
  onWriterFailure?: (writer: string) => void,
  signal?: AbortSignal,
  onProgress?: (cycle: PromptSdlcLocalCycle) => void,
): Promise<PromptSdlcLocalCycle> => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return advancePromptSdlcLocalCycle(
      cycle,
      onWriterFailure,
      signal,
      onProgress,
    );
  }

  if (wizard.gate !== null || cycle.status === "wizard_paused") {
    return cycle;
  }

  if (wizard.phase === "generalize") {
    return runGeneralize(cycle, signal, onWriterFailure);
  }

  if (wizard.phase === "separate" && wizard.splitOptions.length === 0) {
    return runSeparate(cycle, signal, onWriterFailure);
  }

  if (wizard.phase === "evaluate" || wizard.phase === "optimize_modules") {
    const next = await advancePromptSdlcLocalCycle(
      cycle,
      onWriterFailure,
      signal,
      onProgress,
    );
    if (
      isPromptSdlcTerminalStatus(next.status) &&
      next.wizard !== undefined &&
      next.wizard.gate === null
    ) {
      const gate =
        next.wizard.phase === "optimize_modules"
          ? "optimize_modules"
          : "evaluate";
      if (gate === "evaluate" && next.wizard.evaluateSelectedRound === null) {
        const best = selectPromptSdlcBestPrompt(
          next.revisions.map((item) => ({
            roundNumber: item.roundNumber,
            promptText: item.promptText,
            score: item.judgement?.score ?? 0,
            reasons: item.judgement?.reasons ?? "",
          })),
        );
        const defaultRound =
          best?.roundNumber ?? next.revisions.at(-1)?.roundNumber ?? 0;
        return pauseAtGate(
          {
            ...next,
            wizard: {
              ...next.wizard,
              evaluateSelectedRound: defaultRound,
            },
          },
          gate,
        );
      }
      return pauseAtGate(next, gate);
    }
    return next;
  }

  if (wizard.phase === "complete") {
    return cycle;
  }

  return cycle;
};
