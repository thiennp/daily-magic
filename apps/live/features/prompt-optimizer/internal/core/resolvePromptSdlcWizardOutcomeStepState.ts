import {
  buildPromptSdlcWizardStepIndex,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export type PromptSdlcWizardOutcomeStepState = "done" | "failed" | "pending";

const readWizardStepIndex = (stepId: string): number | null => {
  const match = /^wizard-([1-4])$/.exec(stepId);
  if (match === null) {
    return null;
  }
  return Number(match[1]) - 1;
};

export const resolvePromptSdlcWizardOutcomeStepState = (
  cycle: PromptSdlcLocalCycle,
  stepId: string,
): PromptSdlcWizardOutcomeStepState => {
  const wizard = cycle.wizard;
  const stepIndex = readWizardStepIndex(stepId);
  if (wizard === undefined || stepIndex === null) {
    return "pending";
  }

  if (wizard.phase === "complete") {
    return "done";
  }

  const activeIndex = buildPromptSdlcWizardStepIndex(wizard);
  if (stepIndex < activeIndex) {
    return "done";
  }
  if (
    stepIndex === activeIndex &&
    isPromptSdlcTerminalStatus(cycle.status) &&
    cycle.status === "failed"
  ) {
    return "failed";
  }
  if (stepIndex <= activeIndex && isPromptSdlcTerminalStatus(cycle.status)) {
    return "done";
  }
  return "pending";
};
