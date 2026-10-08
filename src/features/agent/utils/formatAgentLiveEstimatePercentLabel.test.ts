import { describe, expect, it } from "vitest";

import { formatAgentLiveEstimatePercentLabel } from "@/features/agent/utils/formatAgentLiveEstimatePercentLabel";

describe("formatAgentLiveEstimatePercentLabel", () => {
  it("shows the percent below the estimate", () => {
    expect(formatAgentLiveEstimatePercentLabel(42, " of estimate")).toBe(
      "42% of estimate",
    );
  });

  it("says taking longer once the estimate is used up", () => {
    expect(formatAgentLiveEstimatePercentLabel(100, " of estimate")).toBe(
      "Taking longer than estimated",
    );
  });
});
