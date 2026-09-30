import type { PromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

export const readPromptSdlcEndStepFailureMessage = (
  cycle: {
    readonly status: PromptSdlcCycleStatus;
    readonly errorMessage: string | null;
  },
  step: {
    readonly id: string;
    readonly detail: string | null;
  },
): string | null => {
  if (step.id !== "end" || cycle.status !== "failed") {
    return null;
  }
  const fromCycle = cycle.errorMessage?.trim() ?? "";
  if (fromCycle.length > 0) {
    return fromCycle;
  }
  const fromStep = step.detail?.trim() ?? "";
  return fromStep.length > 0 ? fromStep : null;
};
