import { describe, expect, it } from "vitest";

import { buildPromptSdlcImproverPrompt } from "@/lib/promptSdlc/buildPromptSdlcImproverPrompt";
import { buildPromptSdlcJudgePrompt } from "@/lib/promptSdlc/buildPromptSdlcJudgePrompt";
import { buildPromptSdlcRunPrompt } from "@/lib/promptSdlc/buildPromptSdlcRunPrompt";
import { buildPromptSdlcTokenReviewPrompt } from "@/lib/promptSdlc/buildPromptSdlcTokenReviewPrompt";
import { findPromptSdlcEvidencePaths } from "@/lib/promptSdlc/findPromptSdlcEvidencePaths";

describe("prompt optimizer role instructions", () => {
  it("runs the prompt in the folder and does not ask for a printed score", () => {
    const prompt = buildPromptSdlcRunPrompt({
      promptText: "Update replies/latest.md.",
      instructions: "  Input: Where is my refund?  ",
    });

    expect(prompt).toContain("Prompt:\nUpdate replies/latest.md.");
    expect(prompt).toContain("Change the files the prompt names.");
    expect(prompt).toContain("Do not score the work.");
    expect(prompt).not.toContain("Reply with only the output.");
  });

  it("finds files named in the prompt and skips urls", () => {
    expect(
      findPromptSdlcEvidencePaths(
        "Edit src/app/page.tsx and `notes/refund.md`. See https://example.com/a.ts",
      ),
    ).toEqual(["src/app/page.tsx", "notes/refund.md"]);
  });

  it("scores the changes, not a guessed printout", () => {
    const prompt = buildPromptSdlcJudgePrompt({
      goal: "Stay inside the facts",
      lookedAt: "git changes in this folder",
      evidence: "M replies/latest.md\n+The ticket has no refund.",
      tokens: 120,
      delayMs: 4200,
      passScore: 90,
      instructions: "Check: replies/latest.md",
    });

    expect(prompt).toContain("Looked at:\ngit changes in this folder");
    expect(prompt).toContain("The ticket has no refund.");
    expect(prompt).toContain(
      "Do not guess a result that is not in the evidence.",
    );
    expect(prompt).toContain("Do not score the wording of the prompt.");
    expect(prompt).not.toContain("Prompt to judge:");
    expect(prompt).toContain("Tokens used: 120");
    expect(prompt).toContain("Delay: 4.2s");
  });

  it("asks for a token suggestion without rewriting the prompt", () => {
    const prompt = buildPromptSdlcTokenReviewPrompt({
      tokens: 4000,
      delayMs: 18000,
      promptText: "Update the file.",
      evidence: "M replies/latest.md",
    });

    expect(prompt).toContain("Do not rewrite the prompt.");
    expect(prompt).toContain("Tokens used: 4000");
    expect(prompt).toContain("If the spend is high, say what to cut.");
  });

  it("asks the improver to use the change score and the token review", () => {
    const prompt = buildPromptSdlcImproverPrompt({
      goal: "Stay inside the facts",
      promptText: "Be helpful.",
      score: 40,
      reasons: "The file invented a refund.\n\nToken review: Cut the examples.",
      instructions: "Name the stop.",
    });

    expect(prompt).toContain("Token review: Cut the examples.");
    expect(prompt).toContain(
      "The score describes the changes, the tokens used, and the delay.",
    );
  });
});
