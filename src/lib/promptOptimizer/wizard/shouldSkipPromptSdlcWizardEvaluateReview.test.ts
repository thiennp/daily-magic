import { describe, expect, it } from "vitest";

import { shouldSkipPromptSdlcWizardEvaluateReview } from "./shouldSkipPromptSdlcWizardEvaluateReview";

describe("shouldSkipPromptSdlcWizardEvaluateReview", () => {
  it("skips when the best revision passes the quality gate", () => {
    expect(
      shouldSkipPromptSdlcWizardEvaluateReview({
        wizard: { evaluateSelectedRound: null },
        revisions: [
          {
            roundNumber: 0,
            promptText: "a",
            judgement: { score: 50, passed: false },
          },
          {
            roundNumber: 1,
            promptText: "b",
            judgement: { score: 82, passed: true },
          },
        ],
      }),
    ).toBe(true);
  });

  it("does not skip when no revision passes", () => {
    expect(
      shouldSkipPromptSdlcWizardEvaluateReview({
        wizard: { evaluateSelectedRound: null },
        revisions: [
          {
            roundNumber: 0,
            promptText: "a",
            judgement: { score: 65, passed: false },
          },
        ],
      }),
    ).toBe(false);
  });
});
