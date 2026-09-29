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
  });
});
