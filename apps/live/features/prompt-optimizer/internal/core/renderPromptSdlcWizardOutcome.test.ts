import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardModuleResults } from "./renderPromptSdlcWizardModuleResults";
import { renderPromptSdlcWizardOutcome } from "./renderPromptSdlcWizardOutcome";

describe("renderPromptSdlcWizardOutcome", () => {
  it("renders a wizard outcome card when the wizard run is stopped", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        modules: [],
      },
    });
    const html = renderPromptSdlcWizardOutcome({
      ...cycle,
      status: "stopped",
    });
    expect(html).toContain('id="prompt-optimizer-wizard-outcome"');
    expect(html).toContain("Process details · steps 1–3");
  });

  it("renders process details without step 4 when the wizard is complete", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        modules: [
          {
            moduleId: "m1",
            title: "Main",
            prompt: "p",
            status: "passed",
            selectedRevisionRound: 0,
            statistics: {
              bestScore: 80,
              bestRound: 0,
              bestRunOutput: "out",
              rounds: [
                {
                  roundNumber: 0,
                  score: 80,
                  passed: true,
                  runOutput: "out",
                  tokens: 5,
                },
              ],
            },
          },
        ],
      },
    });
    const html = renderPromptSdlcWizardOutcome({
      ...cycle,
      status: "passed",
    });
    expect(html).toContain("Process details · steps 1–3");
    expect(html).not.toContain("sdlc-wizard-process-details-summary");
    expect(html).not.toContain("prompt-optimizer-wizard-outcome-wizard-4");
    expect(html).toContain("data-sdlc-outcome-expand-all");
    const moduleHtml = renderPromptSdlcWizardModuleResults({
      ...cycle,
      status: "passed",
    });
    expect(moduleHtml).toContain("prompt-optimizer-wizard-module-results");
    expect(moduleHtml).toContain("sdlc-wizard-outcome-table");
    expect(moduleHtml).toContain("Copy all prompts (Markdown)");
    expect(moduleHtml).toContain("sdlc-copy-feedback-btn");
  });

  it("returns empty for an in-progress wizard", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: createInitialPromptSdlcWizardState("p"),
    });
    expect(
      renderPromptSdlcWizardOutcome({ ...cycle, status: "wizard_paused" }),
    ).toBe("");
  });
});
