import type PromptSdlcWizardChainPriorOutput from "./types/PromptSdlcWizardChainPriorOutput.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/** Prior module runner output for chain topology (module at index - 1). */
export const readPromptSdlcWizardChainPriorOutput = (
  wizard: PromptSdlcWizardState,
  moduleIndex: number,
): PromptSdlcWizardChainPriorOutput => {
  if (wizard.selectedSplitTopology !== "chain") {
    return { output: null, nullReason: "not-chain" };
  }
  if (moduleIndex <= 0) {
    return { output: null, nullReason: "first-module" };
  }
  const prior = wizard.modules[moduleIndex - 1];
  if (prior === undefined) {
    return { output: null, nullReason: "prior-missing" };
  }
  if (prior.status === "stopped") {
    return { output: null, nullReason: "prior-skipped" };
  }
  const fromStats = prior.statistics?.bestRunOutput?.trim() ?? "";
  if (fromStats.length > 0) {
    return { output: fromStats, nullReason: null };
  }
  return { output: null, nullReason: "prior-no-output" };
};
