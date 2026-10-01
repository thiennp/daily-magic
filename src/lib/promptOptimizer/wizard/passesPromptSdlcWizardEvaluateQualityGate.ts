import { PROMPT_SDLC_WIZARD_PASS_SCORE } from "./promptSdlcWizardLimits.constant";

export const passesPromptSdlcWizardEvaluateQualityGate = (
  judgement:
    | {
        readonly score: number | null;
        readonly passed: boolean | null;
      }
    | null
    | undefined,
  passScore: number = PROMPT_SDLC_WIZARD_PASS_SCORE,
): boolean => {
  const score = judgement?.score;
  if (score === null || score === undefined) {
    return false;
  }
  if (score < passScore) {
    return false;
  }
  if (judgement?.passed === false) {
    return false;
  }
  return true;
};
