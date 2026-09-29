import type { PromptSdlcPriorRound } from "@/lib/promptOptimizer/collectPromptSdlcPriorRounds";
import { formatPromptSdlcAvoidList } from "@/lib/promptOptimizer/reconcilePromptSdlcAvoidReasons";
import { selectPromptSdlcBestPrompt } from "@/lib/promptOptimizer/selectPromptSdlcBestPrompt";

export interface PromptSdlcImproverReference {
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
  readonly avoid: string | null;
}

/**
 * The next rewrite always starts from the highest scoring prompt.
 * A tie keeps the later round.
 * Reasons from lower scores become an avoid list. Earlier prompt text is not sent.
 */
export const choosePromptSdlcImproverReference = (input: {
  readonly current: PromptSdlcPriorRound;
  readonly priorRounds: readonly PromptSdlcPriorRound[];
}): PromptSdlcImproverReference => {
  const rounds = [...input.priorRounds, input.current];
  const best = selectPromptSdlcBestPrompt(rounds) ?? {
    roundNumber: input.current.roundNumber,
    promptText: input.current.promptText,
    score: input.current.score,
    reasons: input.current.reasons,
  };
  const lowerReasons = [...rounds]
    .filter((round) => round.score < best.score)
    .sort((left, right) => right.roundNumber - left.roundNumber)
    .map((round) => round.reasons);

  return {
    promptText: best.promptText,
    score: best.score,
    reasons: best.reasons ?? input.current.reasons,
    avoid: formatPromptSdlcAvoidList(lowerReasons),
  };
};
