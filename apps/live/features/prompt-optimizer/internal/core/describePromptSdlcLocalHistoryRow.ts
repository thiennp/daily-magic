import {
  isPromptSdlcTerminalStatus,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcWizardActiveStepIndex } from "./readPromptSdlcWizardActiveStepIndex";
import { labelPromptSdlcErrorKind } from "./labelPromptSdlcErrorKind";

export type PromptSdlcLocalHistoryRowPresentation = {
  readonly badgeClass: string;
  readonly badgeLabel: string;
  readonly subtitle: string;
};

export const describePromptSdlcLocalHistoryRow = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalHistoryRowPresentation => {
  const errorKindLabel = labelPromptSdlcErrorKind(cycle.errorKind);

  if (cycle.wizard === undefined) {
    if (cycle.status === "passed") {
      return {
        badgeClass: "sdlc-history-badge sdlc-history-badge-passed",
        badgeLabel: "Passed",
        subtitle: `Classic · revision round ${cycle.currentRound}`,
      };
    }
    if (cycle.status === "failed") {
      return {
        badgeClass: "sdlc-history-badge sdlc-history-badge-failed",
        badgeLabel: errorKindLabel ?? "Failed",
        subtitle: `Classic · revision round ${cycle.currentRound}`,
      };
    }
    if (cycle.status === "stopped") {
      return {
        badgeClass: "sdlc-history-badge sdlc-history-badge-stopped",
        badgeLabel: errorKindLabel ?? "Stopped",
        subtitle: `Classic · revision round ${cycle.currentRound}`,
      };
    }
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
  if (cycle.status === "passed") {
    const summary = summarizePromptSdlcWizardCompletion(cycle.wizard);
    const modulesNote =
      summary.totalModules > 0
        ? ` · ${summary.passedModuleCount}/${summary.totalModules} modules`
        : "";
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-passed",
      badgeLabel: "Passed",
      subtitle: `Wizard${modulesNote}`,
    };
  }
  if (cycle.status === "failed") {
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-failed",
      badgeLabel: errorKindLabel ?? "Failed",
      subtitle: "Wizard · fail-clean (not success)",
    };
  }
  if (cycle.status === "stopped") {
    if (cycle.wizard.phase === "complete") {
      const summary = summarizePromptSdlcWizardCompletion(cycle.wizard);
      const lowest = summary.rows.reduce<number | null>((min, row) => {
        if (row.bestScore === null) {
          return min;
        }
        return min === null ? row.bestScore : Math.min(min, row.bestScore);
      }, null);
      const lowestNote = lowest === null ? "" : ` · lowest ${lowest}`;
      return {
        badgeClass: "sdlc-history-badge sdlc-history-badge-stopped",
        badgeLabel: errorKindLabel ?? "Stopped",
        subtitle: `Wizard · ${summary.passedModuleCount}/${summary.totalModules} modules${lowestNote}`,
      };
    }
    return {
      badgeClass: "sdlc-history-badge sdlc-history-badge-stopped",
      badgeLabel: errorKindLabel ?? "Stopped",
      subtitle: "Wizard · incomplete",
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
