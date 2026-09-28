import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import { selectPromptSdlcBestPrompt } from "@/lib/promptSdlc/selectPromptSdlcBestPrompt";
import { selectPromptSdlcImproverHistory } from "@/lib/promptSdlc/selectPromptSdlcImproverHistory";

export interface PromptSdlcImproverReference {
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
  readonly history: string | null;
}

const historyFor = (
  rounds: readonly PromptSdlcPriorRound[],
  score: number,
  includePrompts: boolean,
): string | null =>
  selectPromptSdlcImproverHistory({
    priorRounds: rounds,
    currentScore: score,
    includePrompts,
  });

/**
 * A new high is rewritten from itself.
 * A drop or a tie rewrites the best prompt so far, later round on a tie.
 * The other rounds stay in history, with prompt text when the score did not rise.
 */
export const choosePromptSdlcImproverReference = (input: {
  readonly current: PromptSdlcPriorRound;
  readonly priorRounds: readonly PromptSdlcPriorRound[];
}): PromptSdlcImproverReference => {
  const bestPrior =
    input.priorRounds.length === 0
      ? null
      : Math.max(...input.priorRounds.map((round) => round.score));
  if (bestPrior === null || input.current.score > bestPrior) {
    return {
      promptText: input.current.promptText,
      score: input.current.score,
      reasons: input.current.reasons,
      history: historyFor(input.priorRounds, input.current.score, false),
    };
  }

  const best = selectPromptSdlcBestPrompt([
    ...input.priorRounds,
    input.current,
  ]);
  const chosen = best ?? input.current;
  const others = [...input.priorRounds, input.current].filter(
    (round) => round.roundNumber !== chosen.roundNumber,
  );

  return {
    promptText: chosen.promptText,
    score: chosen.score,
    reasons: chosen.reasons ?? input.current.reasons,
    history: historyFor(others, chosen.score, true),
  };
};
