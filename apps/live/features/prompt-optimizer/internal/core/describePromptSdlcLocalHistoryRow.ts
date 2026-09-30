import { isPromptSdlcTerminalStatus } from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardActiveStepIndex } from "./readPromptSdlcWizardActiveStepIndex";

export type PromptSdlcLocalHistoryRowPresentation = {
  readonly badgeClass: string;
  readonly badgeLabel: string;
  readonly subtitle: string;
};

export const describePromptSdlcLocalHistoryRow = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalHistoryRowPresentation => {
  if (cycle.wizard === undefined) {
    if (isPromptSdlcTerminalStatus(cycle.status)) {
      return {
        badgeClass: "sdlc-history-badge sdlc-history-badge-done",
        badgeLabel: "Complete",
        subtitle: `Classic · revision round ${cycle.currentRound}`,
      };
    }
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-live",
      badgeLabel: "In progress",
      subtitle: `Classic · revision round ${cycle.currentRound}`,
    };
  }

  const stepIndex = readPromptSdlcWizardActiveStepIndex(cycle);
  if (cycle.status === "wizard_paused" && stepIndex !== null && stepIndex < 4) {
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-paused",
      badgeLabel: "Paused",
      subtitle: `Wizard · step ${stepIndex + 1} of 4`,
    };
  }
  if (isPromptSdlcTerminalStatus(cycle.status)) {
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-done",
      badgeLabel: "Complete",
      subtitle: "Wizard · all steps finished",
    };
  }
  if (stepIndex !== null && stepIndex < 4) {
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-live",
      badgeLabel: "In progress",
      subtitle: `Wizard · step ${stepIndex + 1} of 4`,
    };
  }
  return {
    badgeClass: "sdlc-history-badge",
    badgeLabel: "Wizard",
    subtitle: cycle.status.replaceAll("_", " "),
  };
};
