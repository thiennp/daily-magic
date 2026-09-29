import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardStepInProgress } from "./renderPromptSdlcWizardStepInProgress";

describe("renderPromptSdlcWizardStepInProgress", () => {
  it("shows step 4 in progress while a module is running", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "optimize_modules",
          gate: null,
          modules: [
            {
              moduleId: "m1",
              title: "Discover",
              prompt: "Find props",
              status: "running",
              selectedRevisionRound: null,
            },
          ],
        },
      }),
      status: "judging" as const,
    };
    const html = renderPromptSdlcWizardStepInProgress(cycle);
    expect(html).toContain("Step 4 — Optimize modules");
    expect(html).toContain("Module 1 of 1");
    expect(html).toContain("Discover");
    expect(html).toContain("prompt-sdlc-wizard-active-step");
  });

  it("does not show in progress when paused at a gate", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "separate",
          phase: "separate",
          splitOptions: [
            {
              id: "a",
              title: "Split",
              summary: "s",
              topology: "chain",
              recommended: true,
              modules: [],
            },
          ],
        },
      }),
      status: "wizard_paused" as const,
    };
    expect(renderPromptSdlcWizardStepInProgress(cycle)).toBe("");
  });
});
