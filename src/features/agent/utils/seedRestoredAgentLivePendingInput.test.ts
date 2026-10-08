import { describe, expect, it } from "vitest";

import { seedRestoredAgentLivePendingInput } from "@/features/agent/utils/seedRestoredAgentLivePendingInput";

describe("seedRestoredAgentLivePendingInput (afae8216)", () => {
  it("seeds the question for a live run waiting on the user", () => {
    expect(
      seedRestoredAgentLivePendingInput({
        runId: "run-1",
        status: "streaming",
        reportSummary: "Waiting for your answer: Which branch?",
      }),
    ).toEqual({
      agentRunId: "run-1",
      question: "Which branch?",
      partialOutput: "",
    });
  });

  it("never seeds an ended run", () => {
    expect(
      seedRestoredAgentLivePendingInput({
        runId: "run-1",
        status: "finished",
        reportSummary: "Waiting for your answer: Which branch?",
      }),
    ).toBeNull();
  });
});
