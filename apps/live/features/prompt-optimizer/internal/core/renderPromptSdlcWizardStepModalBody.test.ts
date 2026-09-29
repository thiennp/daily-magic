import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { describePromptSdlcLocalNodeDetail } from "./describePromptSdlcLocalNodeDetail";
import { renderPromptSdlcLocalNodeModal } from "./renderPromptSdlcLocalNodeModal";

describe("wizard step timeline modal", () => {
  it("shows generalize variables and template instead of Not scored yet", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "Ship a skill.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("Be helpful."),
        phase: "evaluate",
        gate: null,
        templatedPrompt: "Reply for {{issue}}",
        variables: [
          {
            name: "issue",
            description: "Customer issue",
            sampleValue: "billing",
          },
        ],
      },
    });
    const html = renderPromptSdlcLocalNodeModal(
      describePromptSdlcLocalNodeDetail(cycle, {
        id: "wizard-1",
        label: "Step 1 — Generalize",
        state: "done",
        detail: null,
      }),
    );
    expect(html).toContain("Step 1 — Generalize");
    expect(html).toContain("{{issue}}");
    expect(html).toContain("Templated prompt");
    expect(html).not.toContain("Not scored yet");
  });
});
