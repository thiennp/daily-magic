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

  it("shows Failed badge and wizard step activity when evaluate judge fails", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Save tokens",
        sourcePrompt: "p",
        judgeModel: "codex-cli",
        improverModel: "codex-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          phase: "evaluate",
          gate: null,
        },
      }),
      status: "failed" as const,
      errorMessage: "The judge reply needs a score and a reason.",
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html).toContain('class="sdlc-run-badge sdlc-run-badge-failed"');
    expect(html).toContain("Failed</span>");
    expect(html).toContain("Wizard failed during Step 2 — Evaluate.");
    expect(html).toContain("The judge reply needs a score and a reason.");
    expect(html).toContain('class="sdlc-node sdlc-node-failed"');
    expect(html).toContain('class="sdlc-node-reason sdlc-node-reason-failed"');
    expect(html).toContain("<h2>Feedback</h2>");
    expect(html).toContain('aria-busy="false"');
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
