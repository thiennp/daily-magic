import { describe, expect, it } from "vitest";

import { buildPromptSdlcWizardEvaluateJudgePrompt } from "@/lib/promptOptimizer/buildPromptSdlcWizardEvaluateJudgePrompt";

describe("buildPromptSdlcWizardEvaluateJudgePrompt", () => {
  it("asks for prompt-text scoring without a folder run", () => {
    const prompt = buildPromptSdlcWizardEvaluateJudgePrompt({
      goal: "Ship a billing reply skill.",
      promptText: "Reply with empathy.",
      passScore: 70,
    });
    expect(prompt).toContain("wizard step 2");
    expect(prompt).toContain("Do not execute the prompt in a folder");
    expect(prompt).toContain("Score the prompt text from 1 to 100");
    expect(prompt).toContain("Reply with empathy.");
  });
});
