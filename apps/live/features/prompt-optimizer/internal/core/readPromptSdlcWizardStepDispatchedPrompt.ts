import {
  buildPromptSdlcGeneralizePrompt,
  buildPromptSdlcImproverPrompt,
  buildPromptSdlcJudgePrompt,
  buildPromptSdlcSeparatePrompt,
  buildPromptSdlcWizardEvaluateJudgePrompt,
  buildPromptSdlcWizardModuleRunPrompt,
  buildPromptSdlcWizardStepIndex,
  buildPromptSdlcWizardSubstitutionMap,
  isPromptSdlcTerminalStatus,
  readPromptSdlcWizardChainPriorOutput,
  readPromptSdlcWizardEvaluatePromptText,
  readPromptSdlcWizardTemplatedOrConcrete,
  substitutePromptSdlcTemplateValues,
  type PromptSdlcWizardGatePhase,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcLocalImproverReference } from "./readPromptSdlcLocalImproverReference";

const WIZARD_STEP_INDEX: Record<string, number> = {
  "wizard-1": 0,
  "wizard-2": 1,
  "wizard-3": 2,
  "wizard-4": 3,
};

const lastAttemptSummaryForStep = (
  cycle: PromptSdlcLocalCycle,
  step: PromptSdlcWizardGatePhase,
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

const readWizardStepIndex = (stepId: string): number | null =>
  WIZARD_STEP_INDEX[stepId] ?? null;

export const isPromptSdlcWizardStepReached = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): boolean => {
  const wizard = cycle.wizard;
  const stepIndex = readWizardStepIndex(stepId);
  if (wizard === undefined || stepIndex === null) {
    return false;
  }
  if (wizard.phase === "complete") {
    return true;
  }
  const activeIndex = buildPromptSdlcWizardStepIndex(wizard);
  if (stepIndex < activeIndex) {
    return true;
  }
  if (stepIndex === activeIndex) {
    return true;
  }
  return false;
};

const readCurrentRevision = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle["revisions"][number] | null => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  if (revision !== undefined) {
    return revision;
  }
  return cycle.revisions.length === 0 ? null : (cycle.revisions.at(-1) ?? null);
};

const readGeneralizeStepPrompt = (
  cycle: PromptSdlcLocalCycle,
): string | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return null;
  }
  const fromRevision = cycle.revisions[0]?.promptText.trim() ?? "";
  const sourcePrompt =
    fromRevision.length > 0
      ? fromRevision
      : readPromptSdlcWizardTemplatedOrConcrete(wizard).trim();
  if (sourcePrompt.length === 0) {
    return null;
  }
  return buildPromptSdlcGeneralizePrompt({
    goal: cycle.goal,
    sourcePrompt,
    avoid: wizard.avoidByStep.generalize,
    stepInstructions: wizard.pendingStepInstructions,
    lastAttemptSummary: lastAttemptSummaryForStep(cycle, "generalize"),
  });
};

const readEvaluateStepPrompt = (cycle: PromptSdlcLocalCycle): string | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return null;
  }
  if (cycle.status === "improving") {
    const reference = readPromptSdlcLocalImproverReference(cycle);
    if (reference === null) {
      return null;
    }
    return buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: reference.promptText,
      score: reference.score,
      reasons: reference.reasons,
      avoid: reference.avoid,
      instructions: cycle.improverInstructions,
    });
  }

  const revision = readCurrentRevision(cycle);
  const promptText =
    revision?.promptText.trim() ??
    readPromptSdlcWizardEvaluatePromptText({
      wizard,
      revisions: cycle.revisions.map((item) => ({
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        score: item.judgement?.score,
      })),
    }).trim();
  if (promptText.length === 0) {
    return null;
  }
  return buildPromptSdlcWizardEvaluateJudgePrompt({
    goal: cycle.goal,
    promptText,
    passScore: cycle.passScore,
    instructions: cycle.judgeInstructions,
  });
};

const readSeparateStepPrompt = (cycle: PromptSdlcLocalCycle): string | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return null;
  }
  const evaluatedPromptReference = readPromptSdlcWizardEvaluatePromptText({
    wizard,
    revisions: cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score,
    })),
  });
  if (wizard.templatedPrompt.trim().length === 0) {
    return null;
  }
  return buildPromptSdlcSeparatePrompt({
    goal: cycle.goal,
    templatedPrompt: wizard.templatedPrompt,
    variables: wizard.variables,
    evaluatedPromptReference,
    avoid: wizard.avoidByStep.separate,
    stepInstructions: wizard.pendingStepInstructions,
    lastAttemptSummary: lastAttemptSummaryForStep(cycle, "separate"),
  });
};

const readOptimizeModulesStepPrompt = (
  cycle: PromptSdlcLocalCycle,
): string | null => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.modules.length === 0) {
    return null;
  }
  const moduleIndex =
    wizard.phase === "complete"
      ? Math.max(0, wizard.modules.length - 1)
      : wizard.currentModuleIndex;
  const moduleRun = wizard.modules[moduleIndex];
  if (moduleRun === undefined) {
    return null;
  }
  const substitution = buildPromptSdlcWizardSubstitutionMap(wizard);
  const concrete = substitutePromptSdlcTemplateValues(
    moduleRun.prompt,
    substitution,
  ).trim();
  if (concrete.length === 0) {
    return null;
  }

  if (cycle.status === "improving") {
    const reference = readPromptSdlcLocalImproverReference(cycle);
    if (reference === null) {
      return null;
    }
    return buildPromptSdlcImproverPrompt({
      goal: cycle.goal,
      promptText: reference.promptText,
      score: reference.score,
      reasons: reference.reasons,
      avoid: reference.avoid,
      instructions: cycle.improverInstructions,
    });
  }

  const revision = readCurrentRevision(cycle);
  const run = revision?.run;
  if (
    run !== undefined &&
    (cycle.judgePhase === "scoring" ||
      cycle.status === "judging" ||
      (isPromptSdlcTerminalStatus(cycle.status) &&
        revision?.judgement !== null))
  ) {
    return buildPromptSdlcJudgePrompt({
      goal: cycle.goal,
      lookedAt: run.lookedAt ?? "the writer reply",
      evidence: run.evidence ?? run.output,
      tokens: run.tokens,
      delayMs: run.delayMs,
      passScore: cycle.passScore,
      instructions: cycle.judgeInstructions,
    });
  }

  return buildPromptSdlcWizardModuleRunPrompt({
    promptText: concrete,
    runnerInstructions:
      wizard.runnerInstructions ?? cycle.judgeInstructions ?? null,
    chainPriorOutput: readPromptSdlcWizardChainPriorOutput(wizard, moduleIndex)
      .output,
    moduleTitle: moduleRun.title,
  });
};

/** Exact writer/judge prompt last used (or next) for a wizard timeline step. */
export const readPromptSdlcWizardStepDispatchedPrompt = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): string | null => {
  if (!isPromptSdlcWizardStepReached(cycle, stepId)) {
    return null;
  }
  switch (stepId) {
    case "wizard-1":
      return readGeneralizeStepPrompt(cycle);
    case "wizard-2":
      return readEvaluateStepPrompt(cycle);
    case "wizard-3":
      return readSeparateStepPrompt(cycle);
    case "wizard-4":
      return readOptimizeModulesStepPrompt(cycle);
    default:
      return null;
  }
};
