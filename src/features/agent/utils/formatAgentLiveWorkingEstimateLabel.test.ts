import { describe, expect, it } from "vitest";

import { formatAgentLiveWorkingEstimateLabel } from "@/features/agent/utils/formatAgentLiveWorkingEstimateLabel";

describe("formatAgentLiveWorkingEstimateLabel (estimate_ok)", () => {
  it("uses quiet About … for this run meta", () => {
    expect(formatAgentLiveWorkingEstimateLabel(300)).toBe(
      "About 5 min for this run",
    );
  });
});
