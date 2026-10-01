import type { PromptSdlcCostControls } from "@/lib/promptOptimizer/types/PromptSdlcCostControl.type";

/**
 * Effective trial hard cap for judge/improver rounds.
 * Step 4 `maxTrials` applies only after the user confirms the budget gate —
 * otherwise every cycle would inherit the Step 4 default (1) and stop after one round.
 */
export const resolvePromptSdlcMaxTrials = (input: {
  readonly maxRounds: number;
  readonly costControls?: PromptSdlcCostControls | null;
}): number => {
  const controls = input.costControls;
  if (controls?.budgetConfirmed !== true) {
    return input.maxRounds;
  }
  const fromControl = controls.maxTrials;
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
