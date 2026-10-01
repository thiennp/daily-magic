import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { shouldSkipPromptSdlcWizardGeneralizeReview } from "./shouldSkipPromptSdlcWizardGeneralizeReview";

describe("shouldSkipPromptSdlcWizardGeneralizeReview", () => {
  it("skips when templated prompt has no variables or placeholders", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      templatedPrompt: "Answer only from the ticket text.",
      variables: [],
    };
    expect(shouldSkipPromptSdlcWizardGeneralizeReview(wizard)).toBe(true);
  });

  it("does not skip when variables are listed", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      templatedPrompt: "Do {{task}}",
      variables: [
        { name: "task", description: "Task", sampleValue: "refactor" },
      ],
    };
    expect(shouldSkipPromptSdlcWizardGeneralizeReview(wizard)).toBe(false);
  });

  it("does not skip when placeholders remain without variable rows", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      templatedPrompt: "Do {{task}}",
      variables: [],
    };
    expect(shouldSkipPromptSdlcWizardGeneralizeReview(wizard)).toBe(false);
  });

  it("does not skip when templated prompt is empty", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Be helpful."),
      templatedPrompt: "   ",
      variables: [],
    };
    expect(shouldSkipPromptSdlcWizardGeneralizeReview(wizard)).toBe(false);
  });
});
