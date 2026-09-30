import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";

describe("PROMPT_SDLC_LOCAL_FORM_SCRIPT", () => {
  it("enables every run button and shows a hint element", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      'querySelectorAll("[data-sdlc-run]")',
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-run-hint]");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("paintRunHint");
  });

  it("closes field tips on Escape and tracks aria-expanded", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('event.key === "Escape"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("aria-expanded");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("syncRunnerFromJudge");
  });
});
