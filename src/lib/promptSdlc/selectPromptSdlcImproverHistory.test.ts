import { describe, expect, it } from "vitest";

import { collectPromptSdlcPriorRounds } from "@/lib/promptSdlc/collectPromptSdlcPriorRounds";
import { selectPromptSdlcImproverHistory } from "@/lib/promptSdlc/selectPromptSdlcImproverHistory";

describe("selectPromptSdlcImproverHistory", () => {
  const prior = collectPromptSdlcPriorRounds(
    [
      {
        roundNumber: 0,
        promptText: "Be helpful.",
        score: 40,
        reasons: "Too vague.",
      },
      {
        roundNumber: 1,
        promptText: "Answer only from the ticket.",
        score: 70,
        reasons: "Names the source.",
      },
      {
        roundNumber: 2,
        promptText: "Still being scored.",
        score: null,
        reasons: null,
      },
    ],
    2,
  );

  it("keeps scored rounds before the current one", () => {
    expect(prior.map((round) => round.roundNumber)).toEqual([0, 1]);
  });

  it("lists scores when the latest score rose, and omits earlier prompt text", () => {
    const history = selectPromptSdlcImproverHistory({
      priorRounds: prior,
      currentScore: 80,
    });
    expect(history).toContain("Round 0 scored 40. Too vague.");
    expect(history).toContain("Round 1 scored 70. Names the source.");
    expect(history).not.toContain("Earlier prompts");
    expect(history).not.toContain("Be helpful.");
  });

  it("adds earlier prompts newest first when the score did not rise", () => {
    const history = selectPromptSdlcImproverHistory({
      priorRounds: prior,
      currentScore: 55,
      charBudget: 120,
    });
    expect(history).toContain(
      "Earlier prompts, because the score did not rise:",
    );
    expect(history).toContain("Round 1 prompt:\nAnswer only from the ticket.");
    expect(history).not.toContain("Be helpful.");
  });

  it("returns nothing when there is no earlier scored round", () => {
    expect(
      selectPromptSdlcImproverHistory({
        priorRounds: [],
        currentScore: 10,
      }),
    ).toBeNull();
  });
});
