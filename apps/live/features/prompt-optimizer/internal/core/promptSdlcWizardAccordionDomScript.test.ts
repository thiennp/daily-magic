import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT } from "./promptSdlcWizardAccordionDomScript";

describe("PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT", () => {
  it("registers accordion open-state helpers on window", () => {
    expect(PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT).toContain(
      "__promptSdlcWizardAccordionDom",
    );
    expect(PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT).toContain("readOpen");
    expect(PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT).toContain("restoreOpen");
    expect(PROMPT_SDLC_WIZARD_ACCORDION_DOM_SCRIPT).toContain(
      "data-sdlc-wizard-accordion-step",
    );
  });
});
