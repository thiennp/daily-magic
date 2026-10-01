import {
  buildPromptSdlcWizardStepIndex,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

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

export const PROMPT_SDLC_WIZARD_SKIP_STEP_CONFIRM =
  "Skip this wizard step and move on? Running writers stop. You may skip review gates.";
