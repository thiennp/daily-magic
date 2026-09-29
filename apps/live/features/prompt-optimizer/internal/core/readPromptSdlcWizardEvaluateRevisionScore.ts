import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const readPromptSdlcWizardEvaluateRevisionScore = (
  cycle: PromptSdlcLocalCycle,
  roundNumber: number,
): number | null => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === roundNumber,
  );
  return revision?.judgement?.score ?? null;
};

export const canContinuePromptSdlcWizardEvaluateRevision = (
  score: number | null,
): boolean => score !== null && score > 0;
