import type { PromptSdlcPriorRound } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import {
  fitPromptSdlcHistoryRound,
  type PromptSdlcHistoryFit,
} from "@/lib/promptSdlc/fitPromptSdlcHistoryRound";

/** Caps earlier-round text added to an improver prompt. */
export const PROMPT_SDLC_HISTORY_CHAR_BUDGET = 6_000;

const EMPTY_HISTORY_FIT: PromptSdlcHistoryFit = {
  used: 0,
  compact: [],
  prompts: [],
  stop: false,
};

/**
 * Earlier scores always travel with the next rewrite.
 * Earlier prompt text is added only when this score is not above the best earlier score,
 * newest rounds first, until the character budget is full.
 */
export const selectPromptSdlcImproverHistory = (input: {
  readonly priorRounds: readonly PromptSdlcPriorRound[];
  readonly currentScore: number;
  readonly includePrompts?: boolean;
  readonly charBudget?: number;
}): string | null => {
  if (input.priorRounds.length === 0) {
    return null;
  }

  const budget = input.charBudget ?? PROMPT_SDLC_HISTORY_CHAR_BUDGET;
  const bestPrior = Math.max(...input.priorRounds.map((round) => round.score));
  const includePrompts =
    input.includePrompts ?? input.currentScore <= bestPrior;
  const fitted = [...input.priorRounds]
    .reverse()
    .reduce(
      (state, round) =>
        fitPromptSdlcHistoryRound(state, round, budget, includePrompts),
      EMPTY_HISTORY_FIT,
    );

  if (fitted.compact.length === 0) {
    return null;
  }

  const sections = ["Earlier rounds:", ...fitted.compact.slice().reverse()];
  if (fitted.prompts.length > 0) {
    sections.push(
      "",
      "Earlier prompts, because the score did not rise:",
      ...fitted.prompts.slice().reverse(),
    );
  }
  return sections.join("\n");
};
