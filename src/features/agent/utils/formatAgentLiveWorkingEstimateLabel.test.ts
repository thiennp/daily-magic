import { describe, expect, it } from "vitest";

import { formatAgentLiveWorkingEstimateLabel } from "@/features/agent/utils/formatAgentLiveWorkingEstimateLabel";

describe("formatAgentLiveWorkingEstimateLabel", () => {
  it("frames WORKING_ESTIMATE as a soft about-this-much label", () => {
    expect(formatAgentLiveWorkingEstimateLabel(300)).toContain("about 5 min");
    expect(formatAgentLiveWorkingEstimateLabel(300)).toContain("Soft estimate");
  });
});
