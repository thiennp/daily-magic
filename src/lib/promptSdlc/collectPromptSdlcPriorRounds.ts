export interface PromptSdlcPriorRound {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string;
}

export interface PromptSdlcRoundScore {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly score: number | null;
  readonly reasons: string | null;
}

export const collectPromptSdlcPriorRounds = (
  rounds: readonly PromptSdlcRoundScore[],
  currentRound: number,
): readonly PromptSdlcPriorRound[] =>
  rounds
    .flatMap((round): readonly PromptSdlcPriorRound[] => {
      const reasons = round.reasons?.trim() ?? "";
      if (
        round.roundNumber >= currentRound ||
        round.score === null ||
        reasons.length === 0
      ) {
        return [];
      }
      return [
        {
          roundNumber: round.roundNumber,
          promptText: round.promptText,
          score: round.score,
          reasons,
        },
      ];
    })
    .sort((left, right) => left.roundNumber - right.roundNumber);
