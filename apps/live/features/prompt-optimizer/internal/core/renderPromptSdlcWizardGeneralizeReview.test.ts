import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import {
  renderPromptSdlcWizardGeneralizeGateFields,
  renderPromptSdlcWizardGeneralizeReview,
} from "./renderPromptSdlcWizardGeneralizeReview";

describe("renderPromptSdlcWizardGeneralizeReview", () => {
  it("hides templated prompt when generalize produced no variables", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("# Source skill text"),
      variables: [],
      templatedPrompt: "# Source skill text",
    };
    const html = renderPromptSdlcWizardGeneralizeReview(wizard);
    expect(html).toContain("sdlc-wizard-generalize-empty");
    expect(html).not.toContain("Templated prompt");
    expect(html).not.toContain("Source skill text");
    expect(renderPromptSdlcWizardGeneralizeGateFields(wizard)).not.toContain(
      "sdlc-pre",
    );
  });

  it("shows variables and templated prompt after generalize", () => {
    const wizard = {
      ...createInitialPromptSdlcWizardState("Do {{task}}"),
      variables: [{ name: "task", description: "d", sampleValue: "x" }],
      templatedPrompt: "Do {{task}}",
    };
    const html = renderPromptSdlcWizardGeneralizeReview(wizard);
    expect(html).toContain("Templated prompt");
    expect(html).toContain("{{task}}");
  });
});
