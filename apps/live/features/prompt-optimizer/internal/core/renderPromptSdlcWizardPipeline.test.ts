import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import {
  renderPromptSdlcWizardPipeline,
  renderPromptSdlcWizardPipelineModalSummary,
} from "./renderPromptSdlcWizardPipeline";

describe("renderPromptSdlcWizardPipeline", () => {
  it("renders pipeline rows with info buttons", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "codex",
      improverModel: "codex",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "generalize",
        gate: null,
      },
    });
    const html = renderPromptSdlcWizardPipeline({
      ...cycle,
      status: "judging",
    });
    expect(html).toContain("sdlc-pipeline");
    expect(html).toContain("data-sdlc-pipeline-info");
    expect(html).toContain('class="sdlc-field-info"');
    expect(html).toContain('aria-label="About this step"');
    expect(html).toContain("sdlc-tip-icon");
    expect(html).toContain("CLI — generalize");
  });

  it("renders a read-only pipeline summary for modals", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "codex",
      improverModel: "codex",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "evaluate",
        gate: null,
      },
    });
    const html = renderPromptSdlcWizardPipelineModalSummary({
      ...cycle,
      status: "judging",
      currentRound: 0,
    });
    expect(html).toContain("sdlc-pipeline-modal");
    expect(html).not.toContain("data-sdlc-pipeline-info");
    expect(html).toContain("(now)");
  });
});
