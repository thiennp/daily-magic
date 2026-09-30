import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("buildPromptSdlcLocalCycleSection", () => {
  it("does not mark wizard_paused runs as live", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "evaluate",
          phase: "evaluate",
        },
      }),
      status: "wizard_paused" as const,
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html).toContain('data-live="false"');
    expect(html).toContain("Wizard paused.");
    expect(html).not.toContain('class="sdlc-spin"');
    expect(html).toContain('class="sdlc-run-badge sdlc-run-badge-paused"');
    expect(html).toContain("sdlc-run-panel-title");
    expect(html).toContain(">Progress<");
  });

  it("shows live badge and progress layout for active runs", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
      }),
      status: "judging" as const,
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html).toContain('class="sdlc-run-badge sdlc-run-badge-live"');
    expect(html).toContain('class="sdlc-run-activity"');
    expect(html).toContain(">Scoring guide<");
    expect(html).toContain('class="sdlc-tree"');
  });

  it("renders wizard outcome exactly once and skips empty prompt history", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
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
      }),
      status: "stopped" as const,
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html.match(/id="prompt-optimizer-wizard-outcome"/g)?.length).toBe(1);
    expect(html).not.toContain("sdlc-run-prompts-heading");
  });
});
