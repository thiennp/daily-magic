import {
  modulesFromPromptSdlcWizardSplitOption,
  seedPromptSdlcStep4CostProposal,
  seedPromptSdlcWizardParameterValues,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";
import { autoConfirmPromptSdlcCostFromMaxSpend } from "./autoConfirmPromptSdlcCostFromMaxSpend";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/**
 * Same transition as wizard-continue from the separate gate.
 * Seeds pre-Step4 cost proposal (targetTokenBudget + estimatedSpendUsd).
 * Product call: when maxSpendUsd was filled at compose, auto-confirm from that
 * ceiling (skip explicit panel). When unset, budgetConfirmed stays false until
 * the user confirms on the Step4 panel. Agents may already send confirmed*.
 */
export const beginPromptSdlcWizardOptimizeModulesAfterSeparate = (
  cycle: PromptSdlcLocalCycle,
  option: PromptSdlcWizardSplitOption,
): PromptSdlcLocalCycle => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return cycle;
  }
  const modules = modulesFromPromptSdlcWizardSplitOption(option);
  const writerId =
    cycle.judgeModel === "manual" ? null : cycle.judgeModel;
  const seeded = seedPromptSdlcStep4CostProposal({
    moduleCount: modules.length,
    existing: cycle.costControls,
    writerId,
  });
  const costControls = autoConfirmPromptSdlcCostFromMaxSpend(seeded);
  return {
    ...cycle,
    status: "wizard_paused",
    errorMessage: null,
    errorKind: undefined,
    revisions: [],
    costControls,
    wizard: {
      ...wizard,
      gate: "optimize_modules",
      selectedSplitOptionId: option.id,
      selectedSplitTopology: option.topology,
      modules,
      phase: "optimize_modules",
      currentModuleIndex: 0,
      parameterValues:
        Object.keys(wizard.parameterValues ?? {}).length > 0
          ? (wizard.parameterValues ?? {})
          : seedPromptSdlcWizardParameterValues(wizard.variables),
    },
    updatedAt: new Date().toISOString(),
  };
};
