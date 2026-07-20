import { describe, expect, it } from "vitest";

import {
  AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
  AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
} from "@/features/agent/utils/agentLiveProgressStall.constant";
import { resolveAgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

describe("resolveAgentLiveProgressStallState (AGENT-038)", () => {
  it("returns none when the session is not working", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: false,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
      }),
    ).toBe("none");
  });

  it("warns after 30s without Mac output", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
      }),
    ).toBe("warning");
  });

  it("marks stuck after 90s without Mac output", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
      }),
    ).toBe("stuck");
  });
});
