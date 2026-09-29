import { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";

import { substitutePromptSdlcTemplate } from "./substitutePromptSdlcTemplate";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const readPromptSdlcWizardTemplatedOrConcrete = (
  wizard: PromptSdlcWizardState,
): string =>
  substitutePromptSdlcTemplate(wizard.templatedPrompt, wizard.variables);

export const readPromptSdlcWizardEvaluatePromptText = (input: {
  readonly wizard: PromptSdlcWizardState;
  readonly revisions: readonly {
    readonly roundNumber: number;
    readonly promptText: string;
    readonly score?: number | null;
  }[];
}): string => {
  if (input.wizard.evaluateSelectedRound !== null) {
    const picked = input.revisions.find(
      (item) => item.roundNumber === input.wizard.evaluateSelectedRound,
    );
    if (picked !== undefined) {
      return picked.promptText;
    }
  }
  const best = selectPromptSdlcBestPrompt(
    input.revisions.map((item) => ({
      roundNumber: item.roundNumber,
      promptText: item.promptText,
      score: item.score ?? 0,
      reasons: "",
    })),
  );
  return (
    best?.promptText ?? readPromptSdlcWizardTemplatedOrConcrete(input.wizard)
  );
};
