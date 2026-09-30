import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_LOCAL_FORM_SCRIPT } from "./promptSdlcLocalFormScript";

describe("PROMPT_SDLC_LOCAL_FORM_SCRIPT", () => {
  it("toggles wizard run button loading and surfaces block reasons in the hint", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-run-wizard]");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("paintRunButton");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('aria-busy", "true"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      'dataset.sdlcRunState === "waiting"',
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("dataset.canRun");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      "runButton.disabled = false",
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).not.toContain(
      "runButton.disabled = !canRun",
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("showRunBlockHint");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("clearRunHint");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("readRunBlockReason");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-submit-bar]");
  });

  it("closes field tips on Escape and tracks aria-expanded", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain('event.key === "Escape"');
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("aria-expanded");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("syncRunnerFromJudge");
  });

  it("hides compose during an active run and restores it when finished", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("focusRunPanel");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("if (run === null) return");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("sdlc-compose-run-focus");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("sdlc-run-start-failed");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("revertRunStartUi");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("sdlc-run-finished");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      'getElementById("prompt-optimizer-compose")',
    );
  });

  it("steps through compose with per-step validation before Run", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("validateComposeStep");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("showComposeStep");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      "[data-sdlc-compose-continue]",
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-compose-back]");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("paintComposeReview");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain(
      "composeStep !== COMPOSE_STEP_COUNT",
    );
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("stopImmediatePropagation");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("true,");
  });

  it("fills the goal field when a quick-fill chip is clicked", () => {
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("[data-sdlc-goal-preset]");
    expect(PROMPT_SDLC_LOCAL_FORM_SCRIPT).toContain("dataset.sdlcGoalPreset");
  });
});
