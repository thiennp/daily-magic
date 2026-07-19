import { describe, expect, it } from "vitest";

import { resolveAgentLiveProgressStallDetail } from "@/features/agent/utils/resolveAgentLiveProgressStallDetail";

describe("resolveAgentLiveProgressStallDetail (AGENT-038)", () => {
  it("replaces the waiting detail when the run is stuck", () => {
    expect(
      resolveAgentLiveProgressStallDetail({
        stallState: "stuck",
        fallbackDetail: "Waiting for the first update from your Mac agent…",
      }),
    ).toContain("No updates from your Mac yet");
  });

  it("keeps fallback detail during the warning window", () => {
    expect(
      resolveAgentLiveProgressStallDetail({
        stallState: "warning",
        fallbackDetail: "Reading files on your Mac",
      }),
    ).toBe("Reading files on your Mac");
  });
});
