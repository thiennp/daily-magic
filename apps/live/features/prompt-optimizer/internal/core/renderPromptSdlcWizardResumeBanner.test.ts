import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { renderPromptSdlcWizardResumeBanner } from "./renderPromptSdlcWizardResumeBanner";

describe("renderPromptSdlcWizardResumeBanner", () => {
  it("shows paused resume copy and view inputs at a gate", () => {
    const paused = {
      ...createPromptSdlcLocalCycle({
        goal: "Resume this wizard run.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      status: "wizard_paused" as const,
      wizard: {
        ...createInitialPromptSdlcWizardState("Be helpful."),
        gate: "evaluate" as const,
        phase: "evaluate" as const,
      },
    };
    const html = renderPromptSdlcWizardResumeBanner(paused);
    expect(html).toContain("Resume wizard");
    expect(html).toContain("Paused at");
    expect(html).toContain("View inputs");
    expect(html).toContain("sdlc-wizard-resume-paused");
  });

  it("shows live status for an active wizard run", () => {
    const active = {
      ...createPromptSdlcLocalCycle({
        goal: "Running wizard.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
        wizard: createInitialPromptSdlcWizardState("Be helpful."),
        runnerModel: "claude-cli" as const,
      }),
      status: "judging" as const,
    };
    const html = renderPromptSdlcWizardResumeBanner(active);
    expect(html).toContain("Wizard running");
    expect(html).toContain("sdlc-spin");
    expect(html).not.toContain("Paused at");
    expect(html).toContain("View inputs");
    expect(html).toContain("Open this run");
  });
});
