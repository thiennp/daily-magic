import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_WIZARD_CLIENT_SCRIPT } from "./buildPromptSdlcLocalWizardClientScript";

describe("PROMPT_SDLC_WIZARD_CLIENT_SCRIPT", () => {
  it("includes the clicked submit button when building FormData for wizard posts", () => {
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("formDataFromSubmit");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "new FormData(form, submitter)",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "formDataFromSubmit(form, submitter)",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("runApplied");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "sdlc-compose-run-focus",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("focusRunPanel");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("sdlc-compose-step-4");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("summaryStep.hidden");
  });

  it("hides compose for run-focus only after the run panel exists", () => {
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      'const run = document.getElementById("prompt-optimizer-run")',
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "if (run === null) return",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("sdlc-run-start-failed");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("if (runApplied)");
  });
});
