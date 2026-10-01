import {
  modulesFromPromptSdlcWizardSplitOption,
  seedPromptSdlcWizardParameterValues,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";
import { seedPromptSdlcStep4CostProposal } from "@/lib/promptOptimizer/proposePromptSdlcCostBudget";

import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/**
 * Same transition as wizard-continue from the separate gate.
 * Seeds pre-Step4 cost proposal (targetTokenBudget + estimatedSpendUsd);
 * budgetConfirmed stays false until the user confirms.
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
  const costControls = seedPromptSdlcStep4CostProposal({
    moduleCount: modules.length,
    existing: cycle.costControls,
  });
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
