import { describe, expect, it } from "vitest";

import { formatAgentLiveProgressLastMacUpdate } from "@/features/agent/utils/formatAgentLiveProgressLastMacUpdate";

describe("formatAgentLiveProgressLastMacUpdate (AGENT-038)", () => {
  it("formats recent Mac activity", () => {
    expect(formatAgentLiveProgressLastMacUpdate(2_000)).toBe("just now");
    expect(formatAgentLiveProgressLastMacUpdate(12_000)).toBe("12s ago");
    expect(formatAgentLiveProgressLastMacUpdate(125_000)).toBe("2m ago");
  });
});
