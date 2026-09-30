import {
  buildPromptSdlcWizardStepIndex,
  isPromptSdlcTerminalStatus,
  selectPromptSdlcBestPrompt,
  summarizePromptSdlcWizardCompletion,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardEvaluate } from "./advancePromptSdlcWizardLocal";
import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import { beginPromptSdlcWizardSeparateAfterEvaluate } from "./beginPromptSdlcWizardSeparateAfterEvaluate";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { abortPromptSdlcLocalCycleWriters } from "./stopPromptSdlcLocalCycle";

const WIZARD_TIMELINE_STEP_IDS = new Set([
  "wizard-1",
  "wizard-2",
  "wizard-3",
  "wizard-4",
]);

export const readPromptSdlcWizardSkippableTimelineStepId = (
  cycle: PromptSdlcLocalCycle,
): string | null => {
  const wizard = cycle.wizard;
  if (
    wizard === undefined ||
    wizard.phase === "complete" ||
    isPromptSdlcTerminalStatus(cycle.status)
  ) {
    return null;
  }
  const index = buildPromptSdlcWizardStepIndex(wizard);
  if (index < 0 || index > 3) {
    return null;
  }
  return `wizard-${index + 1}`;
};

export const canShowPromptSdlcWizardTimelineSkip = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): boolean => {
  if (!WIZARD_TIMELINE_STEP_IDS.has(stepId)) {
    return false;
  }
  const current = readPromptSdlcWizardSkippableTimelineStepId(cycle);
  return current === stepId;
};

const buildFallbackSplitOption = (
  templatedPrompt: string,
): PromptSdlcWizardSplitOption => ({
  id: "timeline-skip-single-module",
  title: "Single module",
  summary: "Skipped separate — one module from the generalized template.",
  topology: "parallel",
  recommended: true,
  modules: [
    {
      id: "module-1",
      title: "Module 1",
      prompt: templatedPrompt,
      order: 0,
    },
  ],
});

const withEvaluateSelectedRound = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined || wizard.evaluateSelectedRound !== null) {
    return cycle;
  }
  const best = selectPromptSdlcBestPrompt(
    cycle.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.judgement?.score ?? 0,
      reasons: item.judgement?.reasons ?? "",
    })),
  );
  const defaultRound =
    best?.roundNumber ?? cycle.revisions.at(-1)?.roundNumber ?? 0;
  return {
    ...cycle,
    wizard: {
      ...wizard,
      evaluateSelectedRound: defaultRound,
    },
  };
};

const completeWizardAfterSkippingOptimize = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const modules = wizard.modules.map((module) =>
    module.status === "passed"
      ? module
      : { ...module, status: "stopped" as const },
  );
  const wizardComplete = {
    ...wizard,
    modules,
    gate: null,
    phase: "complete" as const,
  };
  const completion = summarizePromptSdlcWizardCompletion(wizardComplete);
  return {
    ...cycle,
    status: completion.terminalStatusSuggestion,
    errorMessage: null,
    wizard: wizardComplete,
    updatedAt: new Date().toISOString(),
  };
};

/** User bypasses the current wizard step (timeline Skip). Aborts writers when needed. */
export const skipPromptSdlcWizardTimelineStep = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): PromptSdlcLocalCycle => {
  if (!canShowPromptSdlcWizardTimelineSkip(cycle, stepId)) {
    return cycle;
  }
  abortPromptSdlcLocalCycleWriters(cycle.id);
  const cleared: PromptSdlcLocalCycle = {
    ...cycle,
    errorMessage: null,
  };
  const wizard = cleared.wizard;
  if (wizard === undefined) {
    return cycle;
  }

  if (stepId === "wizard-1") {
    return beginPromptSdlcWizardEvaluate({
      ...cleared,
      wizard: { ...wizard, gate: null },
    });
  }

  if (stepId === "wizard-2") {
    return beginPromptSdlcWizardSeparateAfterEvaluate(
      withEvaluateSelectedRound(cleared),
    );
  }

  if (stepId === "wizard-3") {
    const option =
      wizard.splitOptions[0] ??
      buildFallbackSplitOption(wizard.templatedPrompt);
    return beginPromptSdlcWizardOptimizeModulesAfterSeparate(cleared, option);
  }

  if (stepId === "wizard-4") {
    return completeWizardAfterSkippingOptimize(cleared);
  }

  return cycle;
};

export const PROMPT_SDLC_WIZARD_SKIP_STEP_CONFIRM =
  "Skip this wizard step and move on? Running writers stop. You may skip review gates.";
