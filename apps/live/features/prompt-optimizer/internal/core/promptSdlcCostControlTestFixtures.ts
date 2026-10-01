import {
  confirmPromptSdlcCostBudget,
  seedPromptSdlcStep4CostProposal,
  type PromptSdlcCostControls,
} from "../../../../adapters/promptSdlcAwcCore";

/** Confirmed ceilings for Step 4 gate tests (avoids confirm UI in unit fixtures). */
export const confirmedPromptSdlcCostControlsForTests = (input?: {
  readonly moduleCount?: number;
  readonly confirmedTokenBudget?: number;
  readonly confirmedMaxSpendUsd?: number;
}): PromptSdlcCostControls => {
  const proposed = seedPromptSdlcStep4CostProposal({
    moduleCount: input?.moduleCount ?? 1,
  });
  const confirmed = confirmPromptSdlcCostBudget({
    existing: proposed,
    confirmedTokenBudget:
      input?.confirmedTokenBudget ?? proposed.targetTokenBudget ?? 8_000,
    confirmedMaxSpendUsd:
      input?.confirmedMaxSpendUsd ?? proposed.estimatedSpendUsd ?? 0.08,
  });
  if (!confirmed.ok) {
    throw new Error(confirmed.errorMessage);
  }
  return confirmed.costControls;
};

export const promptSdlcBudgetConfirmPostFields = (
  costControls: PromptSdlcCostControls | null | undefined,
): Record<string, string> => {
  const tokens =
    costControls?.targetTokenBudget ??
    costControls?.confirmedTokenBudget ??
    8_000;
  const spend =
    costControls?.estimatedSpendUsd ??
    costControls?.confirmedMaxSpendUsd ??
    0.08;
  return {
    confirmedTokenBudget: String(tokens),
    confirmedMaxSpendUsd: String(spend),
  };
};
