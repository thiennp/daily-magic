import {
  invalidatePromptSdlcWizardDownstream,
  PROMPT_SDLC_WIZARD_GATE_PHASES,
  type PromptSdlcWizardGatePhase,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardActiveStepIndex } from "./readPromptSdlcWizardActiveStepIndex";
import { abortPromptSdlcLocalCycleWriters } from "./stopPromptSdlcLocalCycle";

export const PROMPT_SDLC_WIZARD_RETRY_STEP_CONFIRM =
  "Retry this step? Results from this step and all later steps will be removed. You can run the step again from the gate below.";

const readGateForWizardStepId = (
  stepId: string,
): PromptSdlcWizardGatePhase | null => {
  const match = /^wizard-([1-4])$/.exec(stepId);
  if (match === null) {
    return null;
  }
  const index = Number(match[1]) - 1;
  return PROMPT_SDLC_WIZARD_GATE_PHASES[index] ?? null;
};

export const canRetryPromptSdlcWizardAccordionStep = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): boolean => {
  const gate = readGateForWizardStepId(stepId);
  if (gate === null || cycle.wizard === undefined) {
    return false;
  }
  const stepIndex = PROMPT_SDLC_WIZARD_GATE_PHASES.indexOf(gate);
  if (stepIndex === -1) {
    return false;
  }
  const activeIndex = readPromptSdlcWizardActiveStepIndex(cycle);
  if (activeIndex === null) {
    return false;
  }
  if (activeIndex <= stepIndex) {
    return false;
  }
  if (
    cycle.status === "judging" &&
    cycle.wizard.gate === null &&
    activeIndex < PROMPT_SDLC_WIZARD_GATE_PHASES.length
  ) {
    return false;
  }
  return true;
};

export const retryPromptSdlcWizardAccordionStep = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): PromptSdlcLocalCycle => {
  const gate = readGateForWizardStepId(stepId);
  if (gate === null || cycle.wizard === undefined) {
    return cycle;
  }
  if (!canRetryPromptSdlcWizardAccordionStep(cycle, stepId)) {
    return cycle;
  }

  abortPromptSdlcLocalCycleWriters(cycle.id);

  const stepsFrom = PROMPT_SDLC_WIZARD_GATE_PHASES.slice(
    PROMPT_SDLC_WIZARD_GATE_PHASES.indexOf(gate),
  );

  let wizard = invalidatePromptSdlcWizardDownstream(cycle.wizard, gate);
  const sourcePrompt =
    cycle.revisions[0]?.promptText.trim() ?? wizard.templatedPrompt;

  wizard = {
    ...wizard,
    gate,
    phase: gate,
    pendingStepInstructions: "",
    attempts: wizard.attempts.filter((item) => !stepsFrom.includes(item.step)),
    additionalSkillSuggestionsStatus: "idle",
    additionalSkillSuggestions: [],
    additionalSkillSuggestionsSummary: null,
  };

  if (stepsFrom.includes("generalize")) {
    wizard = {
      ...wizard,
      variables: [],
      templatedPrompt: sourcePrompt,
    };
  }
  if (stepsFrom.includes("evaluate")) {
    wizard = { ...wizard, evaluateSelectedRound: null };
  }
  if (stepsFrom.includes("separate")) {
    wizard = {
      ...wizard,
      splitOptions: [],
      selectedSplitOptionId: null,
      selectedSplitTopology: null,
    };
  }
  if (stepsFrom.includes("optimize_modules")) {
    wizard = {
      ...wizard,
      modules: [],
      currentModuleIndex: 0,
      parameterValues: {},
    };
  }

  const revisions = stepsFrom.includes("evaluate")
    ? []
    : stepsFrom.includes("generalize")
      ? [{ roundNumber: 0, promptText: sourcePrompt, judgement: null }]
      : cycle.revisions;

  return {
    ...cycle,
    status: "wizard_paused",
    errorMessage: null,
    currentRound: 0,
    revisions,
    ...(gate === "evaluate" ? { judgePromptTextOnly: true } : {}),
    wizard,
    updatedAt: new Date().toISOString(),
  };
};
