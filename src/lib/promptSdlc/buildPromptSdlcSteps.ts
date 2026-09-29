import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import { buildPromptSdlcClassicRoundSteps } from "@/lib/promptSdlc/buildPromptSdlcClassicRoundSteps";
import { buildPromptSdlcWizardSteps } from "@/lib/promptSdlc/buildPromptSdlcWizardSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

export interface PromptSdlcStep {
  readonly id: string;
  readonly label: string;
  readonly state: "done" | "active";
  readonly detail: string | null;
}

const terminalLabel = (cycle: PromptSdlcCycleView): string => {
  if (cycle.status === "passed") {
    return "Passed";
  }
  if (cycle.status === "stopped") {
    return (cycle.errorMessage ?? "").startsWith("Finished")
      ? "Finished"
      : "Stopped";
  }
  return "Failed";
};

export const buildPromptSdlcSteps = (
  cycle: PromptSdlcCycleView,
): readonly PromptSdlcStep[] => {
  if (cycle.wizard !== undefined) {
    return buildPromptSdlcWizardSteps(cycle);
  }

  const roundSteps = buildPromptSdlcClassicRoundSteps(cycle);
  const endStep: readonly PromptSdlcStep[] = isPromptSdlcTerminalStatus(
    cycle.status,
  )
    ? [
        {
          id: "end",
          label: terminalLabel(cycle),
          state: "done",
          detail: cycle.errorMessage,
        },
      ]
    : [];

  return [...roundSteps, ...endStep];
};
