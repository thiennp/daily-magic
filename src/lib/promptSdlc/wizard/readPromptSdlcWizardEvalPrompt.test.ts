import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import {
  readPromptSdlcWizardEvaluatePromptText,
  readPromptSdlcWizardTemplatedOrConcrete,
} from "./readPromptSdlcWizardEvalPrompt";

describe("readPromptSdlcWizardEvalPrompt", () => {
  it("substitutes variables for concrete read", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Do {{x}}"),
      templatedPrompt: "Do {{x}}",
      variables: [{ name: "x", description: "d", sampleValue: "hello" }],
    };
    expect(readPromptSdlcWizardTemplatedOrConcrete(wizard)).toBe("Do hello");
  });

  it("prefers selected evaluate revision over template", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Original {{x}}"),
      evaluateSelectedRound: 2,
    };
    const text = readPromptSdlcWizardEvaluatePromptText({
      wizard,
      revisions: [
        { roundNumber: 0, promptText: "Round 0", score: 50 },
        { roundNumber: 1, promptText: "Round 1", score: 80 },
        { roundNumber: 2, promptText: "Round 2 picked", score: 60 },
      ],
    });
    expect(text).toBe("Round 2 picked");
  });

  it("falls back to best revision when no selection", () => {
    const wizard = createInitialPromptSdlcWizardState("Original");
    const text = readPromptSdlcWizardEvaluatePromptText({
      wizard,
      revisions: [
        { roundNumber: 0, promptText: "Round 0", score: 40 },
        { roundNumber: 1, promptText: "Round 1 best", score: 90 },
      ],
    });
    expect(text).toBe("Round 1 best");
  });
});
