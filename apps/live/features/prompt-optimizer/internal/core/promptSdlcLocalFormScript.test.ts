import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";

describe("PROMPT_SDLC_LOCAL_FORM_SCRIPT", () => {
  it("keeps run buttons enabled and surfaces block reasons in the hint", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("btn.disabled = false");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("readRunBlockReason");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-submit-bar]");
  });

  it("closes field tips on Escape and tracks aria-expanded", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('event.key === "Escape"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("aria-expanded");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("syncRunnerFromJudge");
  });
});
