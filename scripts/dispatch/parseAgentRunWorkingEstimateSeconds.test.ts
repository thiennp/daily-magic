import { describe, expect, it } from "vitest";

import { parseAgentRunWorkingEstimateSeconds } from "./parseAgentRunWorkingEstimateSeconds";

describe("parseAgentRunWorkingEstimateSeconds (scripts)", () => {
  it("parses a multiline estimate block", () => {
    expect(
      parseAgentRunWorkingEstimateSeconds(
        "[[WORKING_ESTIMATE]]\n180\nLooks quick.",
      ),
    ).toBe(180);
  });
});
