interface PromptSdlcStallState {
  readonly best: number;
  readonly stall: number;
}

/** First score is not a stall. A later score stalls unless it is strictly higher. */
export const countPromptSdlcNonImprovingRounds = (
  scores: readonly number[],
): number => {
  const [first, ...rest] = scores;
  if (first === undefined) {
    return 0;
  }

  return rest.reduce<PromptSdlcStallState>(
    (state, score) =>
      score > state.best
        ? { best: score, stall: 0 }
        : { best: state.best, stall: state.stall + 1 },
    { best: first, stall: 0 },
  ).stall;
};
