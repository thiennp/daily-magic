import { describe, expect, it } from "vitest";

import { buildPromptSdlcSteps } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

const cycle = (
  overrides: Partial<PromptSdlcCycleView>,
): PromptSdlcCycleView => ({
  id: "cycle-1",
  goal: "Answer the customer",
  judgeModel: "claude-cli",
  improverModel: "cursor",
  status: "judging",
  currentRound: 0,
  maxRounds: 3,
  passScore: 80,
  errorMessage: null,
  activeRunId: "run-1",
  activeRunStatus: "running",
  pendingLocal: null,
  revisions: [
    {
      id: "rev-0",
      roundNumber: 0,
      promptText: "Be helpful",
      judgement: null,
    },
  ],
  ...overrides,
});

describe("buildPromptSdlcSteps", () => {
  it("shows the source and the judge step while scoring", () => {
    expect(buildPromptSdlcSteps(cycle({})).map((step) => step.label)).toEqual([
      "Source prompt saved",
      "score for round 0...",
    ]);
  });

  it("shows the score and the improver step while rewriting", () => {
    const labels = buildPromptSdlcSteps(
      cycle({
        status: "improving",
        revisions: [
          {
            id: "rev-0",
            roundNumber: 0,
            promptText: "Be helpful",
            judgement: {
              score: 42,
              passed: false,
              reasons: "No input slots",
              rawReply: "{}",
              judgeModel: "claude-cli",
            },
          },
        ],
      }),
    ).map((step) => step.state + ":" + step.label);

    expect(labels).toEqual([
      "done:Source prompt saved",
      "done:Judge scored round 0: 42 / 100 (weak)",
      "active:revision 1...",
    ]);
  });

  it("closes a finished run with the terminal step", () => {
    const labels = buildPromptSdlcSteps(
      cycle({ status: "passed", errorMessage: null }),
    ).map((step) => step.label);

    expect(labels.at(-1)).toBe("Passed");
    expect(
      buildPromptSdlcSteps(
        cycle({
          status: "stopped",
          errorMessage: "Finished. The best prompt is the result.",
        }),
      ).at(-1)?.label,
    ).toBe("Finished");
  });
});
