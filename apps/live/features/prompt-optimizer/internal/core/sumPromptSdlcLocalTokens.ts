import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const formatPromptSdlcTokenCount = (tokens: number): string =>
  tokens.toLocaleString("en-US");

/** Reported writer tokens through a scored round, including the prompt run and the score. */
export const sumPromptSdlcLocalTokens = (
  cycle: PromptSdlcLocalCycle,
  throughRound?: number,
): number =>
  cycle.revisions.reduce((total, revision) => {
    if (throughRound !== undefined && revision.roundNumber > throughRound) {
      return total;
    }
    return (
      total +
      (revision.writerTokens ?? 0) +
      (revision.run?.tokens ?? 0) +
      (revision.judgement?.tokens ?? 0)
    );
  }, 0);
