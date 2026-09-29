import { describe, expect, it } from "vitest";

import { buildPromptSdlcSteps } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

describe("buildPromptSdlcSteps optimize gate rounds", () => {
  it("shows judge round steps at the optimize gate when paused", () => {
    const labels = buildPromptSdlcSteps({
      id: "cycle-1",
      goal: "Ship",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      status: "wizard_paused",
      currentRound: 1,
      maxRounds: 5,
      passScore: 70,
      errorMessage: null,
      activeRunId: null,
      activeRunStatus: null,
      pendingLocal: null,
      wizard: { phase: "optimize_modules", gate: "optimize_modules" },
      revisions: [
        {
          id: "rev-0",
          roundNumber: 0,
          promptText: "mod",
          judgement: {
            score: 58,
            passed: false,
            reasons: "Thin",
            rawReply: "58",
            judgeModel: "claude-cli",
          },
        },
        {
          id: "rev-1",
          roundNumber: 1,
          promptText: "mod2",
          judgement: {
            score: 84,
            passed: true,
            reasons: "Good",
            rawReply: "84",
            judgeModel: "claude-cli",
          },
        },
      ],
    } satisfies PromptSdlcCycleView).map((step) => step.label);

    expect(labels.some((label) => label.includes("Judge scored round 0"))).toBe(
      true,
    );
    expect(labels.some((label) => label.includes("Judge scored round 1"))).toBe(
      true,
    );
  });
});
