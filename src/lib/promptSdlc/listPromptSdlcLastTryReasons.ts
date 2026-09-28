interface PromptSdlcScoredReason {
  readonly score: number;
  readonly reasons: string;
}

interface PromptSdlcStallReasons {
  readonly best: number;
  readonly reasons: readonly string[];
}

/** Reasons from the current run of scores that did not beat the best. */
export const listPromptSdlcLastTryReasons = (
  rounds: readonly PromptSdlcScoredReason[],
): readonly string[] => {
  const [first, ...rest] = rounds;
  if (first === undefined) {
    return [];
  }

  return rest.reduce<PromptSdlcStallReasons>(
    (state, round) =>
      round.score > state.best
        ? { best: round.score, reasons: [] }
        : {
            best: state.best,
            reasons: [...state.reasons, round.reasons],
          },
    { best: first.score, reasons: [] },
  ).reasons;
};
