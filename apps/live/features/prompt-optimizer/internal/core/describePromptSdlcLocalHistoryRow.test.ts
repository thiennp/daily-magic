import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { describePromptSdlcLocalHistoryRow } from "./describePromptSdlcLocalHistoryRow";

describe("describePromptSdlcLocalHistoryRow", () => {
  it("labels a passed wizard run as Passed", () => {
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
    const row = describePromptSdlcLocalHistoryRow({
      ...cycle,
      status: "passed",
    });
    expect(row.badgeLabel).toBe("Passed");
    expect(row.subtitle).toContain("Wizard");
  });

  it("labels timeout failures unmistakably", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    const row = describePromptSdlcLocalHistoryRow({
      ...cycle,
      status: "failed",
      errorKind: "writer_timeout",
    });
    expect(row.badgeLabel).toBe("Timeout");
  });

  it("labels a paused wizard at step 2", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: "evaluate",
        phase: "evaluate",
      },
    });
    const row = describePromptSdlcLocalHistoryRow({
      ...cycle,
      status: "wizard_paused",
    });
    expect(row.badgeLabel).toBe("Paused");
    expect(row.subtitle).toContain("step 2");
  });
});
