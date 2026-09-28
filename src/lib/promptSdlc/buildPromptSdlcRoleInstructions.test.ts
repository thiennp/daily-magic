import { describe, expect, it } from "vitest";

import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { buildPromptSdlcJudgePrompt } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";

describe("prompt SDLC role instructions", () => {
  it("scores with the goal when the judge has no extra instructions", () => {
    const prompt = buildPromptSdlcJudgePrompt({
      goal: "Stay inside the facts",
      promptText: "Be helpful.",
      passScore: 90,
    });

    expect(prompt).toContain("Goal:\nStay inside the facts");
    expect(prompt).not.toContain("Instructions:");
    expect(prompt).toContain(
      "Score the prompt from 0 to 100 for how well it would achieve the goal.",
    );
  });

  it("asks the judge to use the instructions with the goal", () => {
    const prompt = buildPromptSdlcJudgePrompt({
      goal: "Stay inside the facts",
      promptText: "Be helpful.",
      passScore: 90,
      instructions: "  Penalize invented refunds.  ",
    });

    expect(prompt).toContain("Instructions:\nPenalize invented refunds.");
    expect(prompt.indexOf("Goal:")).toBeLessThan(
      prompt.indexOf("Instructions:"),
    );
    expect(prompt).toContain("achieve the goal and follow the instructions.");
  });

  it("asks the improver to follow optional instructions with the goal", () => {
    const prompt = buildPromptSdlcImproverPrompt({
      goal: "Stay inside the facts",
      promptText: "Be helpful.",
      score: 40,
      reasons: "Too vague.",
      instructions: "Name the stop.",
    });

    expect(prompt).toContain("Instructions:\nName the stop.");
    expect(prompt).toContain(
      "Write the next prompt. Follow the goal and the instructions.",
    );
  });
});
