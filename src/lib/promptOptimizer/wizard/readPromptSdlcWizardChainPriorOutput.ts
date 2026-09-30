import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

/** Prior module runner output for chain topology (module at index - 1). */
export const readPromptSdlcWizardChainPriorOutput = (
  wizard: PromptSdlcWizardState,
  moduleIndex: number,
): string | null => {
  if (wizard.selectedSplitTopology !== "chain" || moduleIndex <= 0) {
    return null;
  }
  const prior = wizard.modules[moduleIndex - 1];
  if (prior === undefined) {
    return null;
  }
  const fromStats = prior.statistics?.bestRunOutput?.trim() ?? "";
  if (fromStats.length > 0) {
    return fromStats;
  }
  return null;
};
