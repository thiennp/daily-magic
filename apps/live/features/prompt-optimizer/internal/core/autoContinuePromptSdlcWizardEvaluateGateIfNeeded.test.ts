import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { autoContinuePromptSdlcWizardEvaluateGateIfNeeded } from "./autoContinuePromptSdlcWizardEvaluateGateIfNeeded";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("autoContinuePromptSdlcWizardEvaluateGateIfNeeded", () => {
  it("starts separate when paused at evaluate with a passing revision", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "evaluate",
        gate: "evaluate",
        evaluateSelectedRound: 1,
      },
    });
    const paused = {
      ...cycle,
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: { score: 40, passed: false, reasons: "", rawReply: "" },
        },
        {
          roundNumber: 1,
          promptText: "better",
          judgement: { score: 88, passed: true, reasons: "", rawReply: "" },
        },
      ],
    };
    const next = autoContinuePromptSdlcWizardEvaluateGateIfNeeded(paused);
    expect(next.status).toBe("judging");
    expect(next.wizard?.phase).toBe("separate");
    expect(next.wizard?.gate).toBeNull();
  });

  it("leaves cycle unchanged when evaluate did not pass", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      workingDirectory: "/tmp",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        phase: "evaluate",
        gate: "evaluate",
        evaluateSelectedRound: 0,
      },
    });
    const paused = {
      ...cycle,
      status: "wizard_paused" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "p",
          judgement: { score: 55, passed: false, reasons: "", rawReply: "" },
        },
      ],
    };
    expect(autoContinuePromptSdlcWizardEvaluateGateIfNeeded(paused)).toBe(
      paused,
    );
  });
});
