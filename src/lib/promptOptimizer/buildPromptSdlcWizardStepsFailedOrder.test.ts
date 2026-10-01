import { describe, expect, it } from "vitest";

import { buildPromptSdlcSteps } from "@/lib/promptOptimizer/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

describe("buildPromptSdlcWizardSteps failed timeline order", () => {
  it("inserts Failed before the wizard step that did not complete", () => {
    const labels = buildPromptSdlcSteps({
      id: "cycle-1",
      goal: "Ship",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      status: "failed",
      currentRound: 0,
      maxRounds: 5,
      passScore: 70,
      errorMessage: "The judge reply needs a score and a reason.",
      activeRunId: null,
      activeRunStatus: null,
      pendingLocal: null,
      wizard: { phase: "evaluate", gate: null },
      revisions: [
        {
          id: "rev-0",
          roundNumber: 0,
          promptText: "Be helpful",
          judgement: {
            score: null,
            passed: null,
            reasons: null,
            rawReply: "not json",
            judgeModel: "claude-cli",
          },
        },
      ],
    } satisfies PromptSdlcCycleView).map((step) => step.label);

    expect(labels).toEqual([
      "Source prompt saved",
      "Step 1 — Generalize",
      "Failed",
    ]);
    expect(labels).not.toContain("Step 2 — Evaluate");
  });
});
