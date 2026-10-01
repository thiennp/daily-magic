import {
  selectPromptSdlcBestPrompt,
  summarizePromptSdlcWizardCompletion,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";

import { beginPromptSdlcWizardEvaluate } from "./advancePromptSdlcWizardLocal";
import { completePromptSdlcLocalWizardCycle } from "./completePromptSdlcLocalWizardCycle";
import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import { beginPromptSdlcWizardSeparateAfterEvaluate } from "./beginPromptSdlcWizardSeparateAfterEvaluate";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { abortPromptSdlcLocalCycleWriters } from "./stopPromptSdlcLocalCycle";
import { canShowPromptSdlcWizardTimelineSkip } from "./skipPromptSdlcWizardTimelineStepUi";

export {
  canShowPromptSdlcWizardTimelineSkip,
  PROMPT_SDLC_WIZARD_SKIP_STEP_CONFIRM,
  readPromptSdlcWizardSkippableTimelineStepId,
} from "./skipPromptSdlcWizardTimelineStepUi";

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
  const wizardWithModules = {
    ...wizard,
    modules,
    gate: null,
  };
  const completion = summarizePromptSdlcWizardCompletion(wizardWithModules);
  return completePromptSdlcLocalWizardCycle(
    { ...cycle, errorMessage: null, wizard: wizardWithModules },
    completion.terminalStatusSuggestion,
  );
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
