import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

/** Adds the token suggestion to the score reason the improver will read. */
export const appendPromptSdlcLocalTokenReview = (
  cycle: PromptSdlcLocalCycle,
  review: string,
): PromptSdlcLocalCycle => {
  const text = review.trim().replace(/^Token review:\s*/i, "");
  if (text.length === 0) {
    return cycle;
  }
  const note = `Token review: ${text}`;
  return {
    ...cycle,
    revisions: cycle.revisions.map((revision) => {
      if (revision.roundNumber !== cycle.currentRound) {
        return revision;
      }
      const reasons = revision.judgement?.reasons?.trim() ?? "";
      return {
        ...revision,
        run:
          revision.run === undefined
            ? revision.run
            : { ...revision.run, tokenReview: text },
        judgement:
          revision.judgement === null
            ? revision.judgement
            : {
                ...revision.judgement,
                reasons: reasons.length === 0 ? note : `${reasons}\n\n${note}`,
              },
      };
    }),
  };
};
