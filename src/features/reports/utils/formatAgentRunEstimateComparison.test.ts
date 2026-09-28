import { describe, expect, it } from "vitest";

import { formatAgentRunEstimateComparison } from "./formatAgentRunEstimateComparison";

describe("formatAgentRunEstimateComparison", () => {
  it("compares estimated and actual durations", () => {
    expect(
      formatAgentRunEstimateComparison({
        estimateSeconds: 120,
        actualSeconds: 90,
      }),
    ).toBe("Estimated 2 min · Actual 1 min 30s · 30s under");
  });

  it("returns null when neither duration is stored", () => {
    expect(
      formatAgentRunEstimateComparison({
        estimateSeconds: null,
        actualSeconds: null,
      }),
    ).toBeNull();
  });
});
