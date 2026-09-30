import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";

describe("PROMPT_SDLC_LOCAL_FORM_SCRIPT", () => {
  it("toggles wizard run button loading and surfaces block reasons in the hint", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-run-wizard]");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("paintRunButton");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('aria-busy", "true"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      "runButton.disabled = !canRun",
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("readRunBlockReason");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-submit-bar]");
  });

  it("closes field tips on Escape and tracks aria-expanded", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('event.key === "Escape"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("aria-expanded");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("syncRunnerFromJudge");
  });
});
