import {
  buildPromptSdlcGeneralizePrompt,
  applyPromptSdlcWizardPlaceholdersToSplitOptions,
  buildPromptSdlcSeparatePrompt,
  isPromptSdlcTerminalStatus,
  parsePromptSdlcGeneralizeReply,
  parsePromptSdlcSeparateReply,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_MAX_ROUNDS,
  readPromptSdlcWizardModulePassScore,
  readPromptSdlcWizardEvaluatePromptText,
  buildPromptSdlcWizardSubstitutionMap,
  readPromptSdlcWizardTemplatedOrConcrete,
  recordPromptSdlcWizardAttempt,
  seedPromptSdlcWizardParameterValues,
  selectPromptSdlcBestPrompt,
  substitutePromptSdlcTemplateValues,
  finalizePromptSdlcWizardModuleRun,
  collectPromptSdlcWizardModuleStatistics,
  shouldSkipPromptSdlcWizardGeneralizeReview,
  shouldSkipPromptSdlcWizardEvaluateReview,
  shouldSkipPromptSdlcWizardSeparateReview,
} from "../../../../adapters/promptSdlcAwcCore";
import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import { beginPromptSdlcWizardSeparateAfterEvaluate } from "./beginPromptSdlcWizardSeparateAfterEvaluate";
import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import {
  classifyPromptSdlcWriterErrorKind,
  isPromptSdlcWriterTimeoutError,
  type PromptSdlcWriterErrorKind,
} from "./readPromptSdlcWriterOutput";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";
import { advancePromptSdlcLocalCycle } from "./advancePromptSdlcLocalCycle";
import { readPromptSdlcWizardScoredRevisions } from "./readPromptSdlcWizardScoredRevisions";

const failCycle = (
  cycle: PromptSdlcLocalCycle,
  errorMessage: string,
  errorKind?: PromptSdlcWriterErrorKind,
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "failed",
  errorMessage,
  errorKind,
  updatedAt: new Date().toISOString(),
});

const pauseWizardWriterFailure = (
  cycle: PromptSdlcLocalCycle,
  gate: NonNullable<PromptSdlcLocalCycle["wizard"]>["gate"],
  errorMessage: string,
): PromptSdlcLocalCycle => {
  if (cycle.wizard === undefined || gate === null) {
    return failCycle(cycle, errorMessage);
  }
  return {
    ...cycle,
    status: "wizard_paused",
    errorMessage,
    wizard: {
      ...cycle.wizard,
      gate,
    },
    updatedAt: new Date().toISOString(),
  };
};

const failOrPauseWizardWriter = (
  cycle: PromptSdlcLocalCycle,
  gate: NonNullable<PromptSdlcLocalCycle["wizard"]>["gate"],
  reply: {
    readonly errorMessage: string;
    readonly stopped?: boolean;
    readonly errorKind?: PromptSdlcWriterErrorKind;
  },
): PromptSdlcLocalCycle => {
  if (isPromptSdlcWriterTimeoutError(reply)) {
    return failCycle(
      cycle,
      reply.errorMessage,
      classifyPromptSdlcWriterErrorKind(reply),
    );
  }
  return pauseWizardWriterFailure(cycle, gate, reply.errorMessage);
};

const snapshotEvaluateWizardAttempt = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  if (readPromptSdlcWizardScoredRevisions(cycle).length === 0) {
    return cycle;
  }
  return {
    ...cycle,
    wizard: recordPromptSdlcWizardAttempt({
      wizard,
      step: "evaluate",
      output: {
        selectedRound: wizard.evaluateSelectedRound,
        revisions: cycle.revisions.map((item) => ({
          roundNumber: item.roundNumber,
          promptText: item.promptText,
          score: item.judgement?.score ?? null,
          passed: item.judgement?.passed ?? null,
          reasons: item.judgement?.reasons ?? null,
        })),
      },
      userFeedback: null,
      stepInstructions: null,
    }),
  };
};

const moduleCycleStatus = (
  status: PromptSdlcLocalCycle["status"],
): "passed" | "stopped" | "failed" => {
  if (status === "passed") {
    return "passed";
  }
  if (status === "failed") {
    return "failed";
  }
  return "stopped";
};

const snapshotOptimizeModuleWizardAttempt = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const statistics = collectPromptSdlcWizardModuleStatistics({
    revisions: cycle.revisions,
  });
  if (statistics.rounds.length === 0) {
    return cycle;
  }
  const moduleRun = wizard.modules[wizard.currentModuleIndex];
  return {
    ...cycle,
    wizard: recordPromptSdlcWizardAttempt({
      wizard,
      step: "optimize_modules",
      output: {
        moduleId: moduleRun?.moduleId ?? null,
        moduleIndex: wizard.currentModuleIndex,
        statistics,
      },
      userFeedback: null,
      stepInstructions: null,
    }),
  };
};

const pauseAtGate = (
  cycle: PromptSdlcLocalCycle,
  gate: NonNullable<PromptSdlcLocalCycle["wizard"]>["gate"],
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "wizard_paused",
  errorMessage: null,
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
    return failOrPauseWizardWriter(cycle, "generalize", reply);
  }
  try {
    const parsed = parsePromptSdlcGeneralizeReply(reply.text);
    const nextWizard = recordPromptSdlcWizardAttempt({
      wizard: {
        ...wizard,
        templatedPrompt: parsed.templatedPrompt,
        variables: parsed.variables,
        parameterValues: seedPromptSdlcWizardParameterValues(parsed.variables),
      },
      step: "generalize",
      output: parsed,
      userFeedback: null,
      stepInstructions:
        wizard.pendingStepInstructions.trim().length === 0
          ? null
          : wizard.pendingStepInstructions,
    });
    const withWizard = {
      ...cycle,
      wizard: nextWizard,
    };
    if (shouldSkipPromptSdlcWizardGeneralizeReview(nextWizard)) {
      return beginPromptSdlcWizardEvaluate({
        ...withWizard,
        wizard: { ...nextWizard, gate: null },
      });
    }
    return pauseAtGate(withWizard, "generalize");
  } catch (error) {
    return pauseWizardWriterFailure(
      cycle,
      "generalize",
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
  const evaluatedPromptReference = readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  });
  const prompt = buildPromptSdlcSeparatePrompt({
    goal: cycle.goal,
    templatedPrompt: wizard.templatedPrompt,
    variables: wizard.variables,
    evaluatedPromptReference,
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
    return failOrPauseWizardWriter(cycle, "separate", reply);
  }
  try {
    const rawOptions = parsePromptSdlcSeparateReply(reply.text);
    const options = applyPromptSdlcWizardPlaceholdersToSplitOptions(
      rawOptions,
      wizard.variables,
    );
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
    const withOptions = {
      ...cycle,
      wizard: nextWizard,
    };
    if (shouldSkipPromptSdlcWizardSeparateReview(options)) {
      return beginPromptSdlcWizardOptimizeModulesAfterSeparate(
        withOptions,
        options[0],
      );
    }
    return pauseAtGate(withOptions, "separate");
  } catch (error) {
    return pauseWizardWriterFailure(
      cycle,
      "separate",
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
    judgePromptTextOnly: true,
    currentRound: 0,
    passScore: cycle.passScore,
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
  const substitution = buildPromptSdlcWizardSubstitutionMap(wizard);
  const concrete = substitutePromptSdlcTemplateValues(
    moduleRun.prompt,
    substitution,
  );
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
    judgePromptTextOnly: false,
    runnerModel: runner,
    currentRound: 0,
    passScore: readPromptSdlcWizardModulePassScore(wizard),
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
      if (next.status === "failed") {
        return next;
      }
      if (
        (gate === "evaluate" || gate === "optimize_modules") &&
        readPromptSdlcWizardScoredRevisions(next).length === 0
      ) {
        return next;
      }
      let gateCandidate = next;
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
        gateCandidate = {
          ...next,
          wizard: {
            ...next.wizard,
            evaluateSelectedRound: defaultRound,
          },
        };
      }
      if (
        gate === "evaluate" &&
        shouldSkipPromptSdlcWizardEvaluateReview({
          revisions: gateCandidate.revisions,
          wizard: gateCandidate.wizard!,
          passScore: gateCandidate.passScore,
        })
      ) {
        const snapshotted = snapshotEvaluateWizardAttempt(
          pauseAtGate(gateCandidate, gate),
        );
        return beginPromptSdlcWizardSeparateAfterEvaluate(snapshotted);
      }
      const paused = pauseAtGate(gateCandidate, gate);
      const withModulePaused =
        gate === "optimize_modules" && paused.wizard !== undefined
          ? (() => {
              const finalizedWizard = finalizePromptSdlcWizardModuleRun({
                wizard: {
                  ...paused.wizard!,
                  modules: paused.wizard!.modules.map((item, index) =>
                    index === paused.wizard!.currentModuleIndex &&
                    item.status === "running"
                      ? { ...item, status: "paused" as const }
                      : item,
                  ),
                },
                moduleIndex: paused.wizard!.currentModuleIndex,
                revisions: paused.revisions,
                cycleStatus: moduleCycleStatus(next.status),
              });
              return {
                ...paused,
                wizard: finalizedWizard,
              };
            })()
          : paused;
      if (gate === "evaluate") {
        return snapshotEvaluateWizardAttempt(withModulePaused);
      }
      return snapshotOptimizeModuleWizardAttempt(withModulePaused);
    }
    return next;
  }

  if (wizard.phase === "complete") {
    return cycle;
  }

  return cycle;
};
