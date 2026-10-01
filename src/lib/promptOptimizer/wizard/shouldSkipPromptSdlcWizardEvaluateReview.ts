import { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";

import { passesPromptSdlcWizardEvaluateQualityGate } from "./passesPromptSdlcWizardEvaluateQualityGate";

/**
 * Step 2 gate can auto-continue when the selected (or best) revision passes the wizard quality gate.
 */
export const shouldSkipPromptSdlcWizardEvaluateReview = (input: {
  readonly revisions: readonly {
    readonly roundNumber: number;
    readonly promptText: string;
    readonly judgement?: {
      readonly score: number | null;
      readonly passed: boolean | null;
    } | null;
  }[];
  readonly wizard: { readonly evaluateSelectedRound: number | null };
  readonly passScore: number;
}): boolean => {
  const selectedRound =
    input.wizard.evaluateSelectedRound ??
    selectPromptSdlcBestPrompt(
      input.revisions.map((item) => ({
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        score: item.judgement?.score ?? null,
        reasons: null,
      })),
    )?.roundNumber;
  if (selectedRound === undefined) {
    return false;
  }
  const revision = input.revisions.find(
    (item) => item.roundNumber === selectedRound,
  );
  if (revision === undefined) {
    return false;
  }
  return passesPromptSdlcWizardEvaluateQualityGate(
    revision.judgement,
    input.passScore,
  );
};
