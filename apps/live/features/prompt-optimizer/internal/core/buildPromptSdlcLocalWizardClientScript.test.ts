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
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "[data-sdlc-compose-head-actions]",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "__promptSdlcWizardAccordionDom",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("restoreOpen");
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

  it("autofocuses the wizard gate only when the active step id changes", () => {
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "lastWizardAutofocusStepId",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "readWizardAutofocusStepId",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain(
      "stepId === lastWizardAutofocusStepId",
    );
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("dataset.sdlcStepId");
    expect(PROMPT_SDLC_WIZARD_CLIENT_SCRIPT).toContain("runBusyOnLoad");
  });
});
