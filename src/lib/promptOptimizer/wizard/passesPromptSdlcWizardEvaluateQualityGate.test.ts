import { describe, expect, it } from "vitest";

import { passesPromptSdlcWizardEvaluateQualityGate } from "./passesPromptSdlcWizardEvaluateQualityGate";

describe("passesPromptSdlcWizardEvaluateQualityGate", () => {
  it("requires score at or above the pass score", () => {
    expect(
      passesPromptSdlcWizardEvaluateQualityGate({
        score: 69,
        passed: false,
      }),
    ).toBe(false);
    expect(
      passesPromptSdlcWizardEvaluateQualityGate({
        score: 70,
        passed: true,
      }),
    ).toBe(true);
  });

  it("rejects when passed is false even if score meets the bar", () => {
    expect(
      passesPromptSdlcWizardEvaluateQualityGate({
        score: 85,
        passed: false,
      }),
    ).toBe(false);
  });
});
