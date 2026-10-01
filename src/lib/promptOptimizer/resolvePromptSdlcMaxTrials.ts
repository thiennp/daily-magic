import type { PromptSdlcCostControls } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/** Effective trial hard cap: costControls.maxTrials when set, else cycle maxRounds. */
export const resolvePromptSdlcMaxTrials = (input: {
  readonly maxRounds: number;
  readonly costControls?: PromptSdlcCostControls | null;
}): number => {
  const fromControl = input.costControls?.maxTrials;
  if (
    fromControl !== undefined &&
    fromControl !== null &&
    Number.isFinite(fromControl) &&
    fromControl >= 1
  ) {
    return Math.min(input.maxRounds, Math.floor(fromControl));
  }
  return input.maxRounds;
};
