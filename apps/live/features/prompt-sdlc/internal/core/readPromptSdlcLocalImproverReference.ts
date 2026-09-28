import {
  choosePromptSdlcImproverReference,
  collectPromptSdlcPriorRounds,
  type PromptSdlcImproverReference,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const readPromptSdlcLocalImproverReference = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcImproverReference | null => {
  const revision = cycle.revisions.find(
    (item) => item.roundNumber === cycle.currentRound,
  );
  const score = revision?.judgement?.score;
  const reasons = revision?.judgement?.reasons?.trim() ?? "";
  if (
    revision === undefined ||
    score === null ||
    score === undefined ||
    reasons.length === 0
  ) {
    return null;
  }

  return choosePromptSdlcImproverReference({
    current: {
      roundNumber: revision.roundNumber,
      promptText: revision.promptText,
      score,
      reasons,
    },
    priorRounds: collectPromptSdlcPriorRounds(
      cycle.revisions.map((item) => ({
        roundNumber: item.roundNumber,
        promptText: item.promptText,
        score: item.judgement?.score ?? null,
        reasons: item.judgement?.reasons ?? null,
      })),
      cycle.currentRound,
    ),
  });
};
