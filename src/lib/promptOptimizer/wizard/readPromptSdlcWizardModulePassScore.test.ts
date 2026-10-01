import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "./createInitialPromptSdlcWizardState";
import { PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE } from "./promptSdlcWizardLimits.constant";
import { readPromptSdlcWizardModulePassScore } from "./readPromptSdlcWizardModulePassScore";

describe("readPromptSdlcWizardModulePassScore", () => {
  it("defaults to 90 when wizard is missing or unset", () => {
    expect(readPromptSdlcWizardModulePassScore(undefined)).toBe(
      PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
    );
    expect(
      readPromptSdlcWizardModulePassScore({
        ...createInitialPromptSdlcWizardState("p"),
        modulePassScore: undefined,
      }),
    ).toBe(90);
  });

  it("returns stored module pass score when valid", () => {
    expect(
      readPromptSdlcWizardModulePassScore({
        ...createInitialPromptSdlcWizardState("p"),
        modulePassScore: 85,
      }),
    ).toBe(85);
  });
});
