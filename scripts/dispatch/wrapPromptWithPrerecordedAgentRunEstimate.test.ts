import { describe, expect, it } from "vitest";

import { wrapPromptWithPrerecordedAgentRunEstimate } from "./wrapPromptWithPrerecordedAgentRunEstimate";

describe("wrapPromptWithPrerecordedAgentRunEstimate", () => {
  it("tells the agent not to confirm the estimate", () => {
    const wrapped = wrapPromptWithPrerecordedAgentRunEstimate("run tests", {
      estimateSeconds: 120,
      estimateSummary: "Estimated ~2 min. Starting work on your Mac…",
    });

    expect(wrapped).toContain("Recorded estimate: 120 seconds.");
    expect(wrapped).toContain("Do not use [[AWAITING_INPUT]]");
    expect(wrapped).toContain("Proceed with the task immediately.");
  });
});
