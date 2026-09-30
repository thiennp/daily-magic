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
  });
});
