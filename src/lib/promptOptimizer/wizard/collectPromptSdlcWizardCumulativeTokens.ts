import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const collectPromptSdlcWizardCumulativeTokens = (
  wizard: PromptSdlcWizardState,
): number | null => {
  const total = wizard.modules.reduce((sum, module) => {
    const moduleTotal =
      module.statistics?.rounds.reduce(
        (roundSum, round) => roundSum + (round.tokens ?? 0),
        0,
      ) ?? 0;
    return sum + moduleTotal;
  }, 0);
  return total > 0 ? total : null;
};
