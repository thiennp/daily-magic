import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { readPromptSdlcStopControlKind } from "./readPromptSdlcStopControlKind";

describe("readPromptSdlcStopControlKind", () => {
  const wizardCycle = (input: {
    readonly status: PromptSdlcLocalCycle["status"];
    readonly gate:
      "generalize" | "evaluate" | "separate" | "optimize_modules" | null;
    readonly phase: "generalize" | "evaluate" | "separate" | "optimize_modules";
  }) => ({
    ...createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: input.gate,
        phase: input.phase,
      },
    }),
    status: input.status,
  });

  it("shows Stop run for a legacy non-wizard run", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    expect(readPromptSdlcStopControlKind({ ...cycle, status: "judging" })).toBe(
      "legacy_stop",
    );
  });

  it("hides stop controls while the wizard is paused at a gate", () => {
    expect(
      readPromptSdlcStopControlKind(
        wizardCycle({
          status: "wizard_paused",
          gate: "evaluate",
          phase: "evaluate",
        }),
      ),
    ).toBe("none");
  });

  it("shows end wizard while a wizard writer step is running", () => {
    expect(
      readPromptSdlcStopControlKind(
        wizardCycle({
          status: "judging",
          gate: null,
          phase: "generalize",
        }),
      ),
    ).toBe("wizard_end_only");
  });

  it("shows module interrupt while step 4 executes a module", () => {
    expect(
      readPromptSdlcStopControlKind(
        wizardCycle({
          status: "judging",
          gate: null,
          phase: "optimize_modules",
        }),
      ),
    ).toBe("wizard_module_interrupt");
  });

  it("hides controls for terminal cycles", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    expect(readPromptSdlcStopControlKind({ ...cycle, status: "passed" })).toBe(
      "none",
    );
  });
});
