import { describe, expect, it } from "vitest";

import { parseAgentLiveWorkingEstimateSeconds } from "@/features/agent/utils/parseAgentLiveWorkingEstimateSeconds";

describe("parseAgentLiveWorkingEstimateSeconds (AGENT-052)", () => {
  it("returns null when no estimate marker is present", () => {
    expect(parseAgentLiveWorkingEstimateSeconds("working…")).toBeNull();
  });

  it("parses a multiline estimate block", () => {
    expect(
      parseAgentLiveWorkingEstimateSeconds(
        ["[[WORKING_ESTIMATE]]", "120", "[[PROGRESS]]", "Reading"].join("\n"),
      ),
    ).toBe(120);
  });

  it("uses the latest estimate when the agent updates it", () => {
    expect(
      parseAgentLiveWorkingEstimateSeconds(
        [
          "[[WORKING_ESTIMATE]]",
          "60",
          "later",
          "[[WORKING_ESTIMATE]]",
          "180",
        ].join("\n"),
      ),
    ).toBe(180);
  });
});
