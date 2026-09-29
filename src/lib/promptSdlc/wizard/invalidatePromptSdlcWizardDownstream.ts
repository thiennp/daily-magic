import type { PromptSdlcWizardGatePhase } from "./types/PromptSdlcWizardPhase.constant";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

const order: readonly PromptSdlcWizardGatePhase[] = [
  "generalize",
  "evaluate",
  "separate",
  "optimize_modules",
];

export const invalidatePromptSdlcWizardDownstream = (
  wizard: PromptSdlcWizardState,
  fromStep: PromptSdlcWizardGatePhase,
): PromptSdlcWizardState => {
  const index = order.indexOf(fromStep);
  if (index === -1) {
    return wizard;
  }
  const cleared = order.slice(index + 1);
  if (cleared.length === 0) {
    return { ...wizard, gate: null };
  }
  return {
    ...wizard,
    gate: null,
    evaluateSelectedRound: cleared.includes("evaluate")
      ? null
      : wizard.evaluateSelectedRound,
    splitOptions: cleared.includes("separate") ? [] : wizard.splitOptions,
    selectedSplitOptionId: cleared.includes("separate")
      ? null
      : wizard.selectedSplitOptionId,
    modules: cleared.includes("optimize_modules") ? [] : wizard.modules,
    currentModuleIndex: cleared.includes("optimize_modules")
      ? 0
      : wizard.currentModuleIndex,
    phase:
      fromStep === "generalize"
        ? "generalize"
        : fromStep === "evaluate"
          ? "evaluate"
          : fromStep === "separate"
            ? "separate"
            : "optimize_modules",
  };
};
