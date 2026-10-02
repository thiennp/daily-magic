import { describe, expect, it } from "vitest";

import { renderPromptSdlcWizardRevisionRoundPromptInfo } from "./renderPromptSdlcWizardRevisionRoundPromptInfo";

describe("renderPromptSdlcWizardRevisionRoundPromptInfo", () => {
  it("renders an info button and template for non-empty prompt text", () => {
    const html = renderPromptSdlcWizardRevisionRoundPromptInfo({
      roundLabel: "Round 2",
      promptText: "Rewrite with fewer tokens.",
    });
    expect(html).toContain("data-sdlc-revision-round-prompt-info");
    expect(html).toContain("View prompt for Round 2");
    expect(html).toContain("Prompt — Round 2");
    expect(html).toContain("Rewrite with fewer tokens.");
  });

  it("returns empty when prompt text is blank", () => {
    expect(
      renderPromptSdlcWizardRevisionRoundPromptInfo({
        roundLabel: "Round 1",
        promptText: "   ",
      }),
    ).toBe("");
  });
});
