import { describe, expect, it } from "vitest";

import {
  AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
  AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
} from "@/features/agent/utils/agentLiveProgressStall.constant";
import { resolveAgentLiveProgressStallState } from "@/features/agent/utils/resolveAgentLiveProgressStallState";

describe("resolveAgentLiveProgressStallState (AGENT-038 / AGENT-052)", () => {
  it("returns none when the session is not working", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: false,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
        workedMs: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
        estimateSeconds: 30,
      }),
    ).toBe("none");
  });

  it("warns after 30s without Mac output while still within the estimate", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_WARNING_MS,
        workedMs: 40_000,
        estimateSeconds: 300,
      }),
    ).toBe("warning");
  });

  it("AGENT-052: does not mark stuck from silence alone when an estimate remains", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
        workedMs: 90_000,
        estimateSeconds: 600,
      }),
    ).toBe("warning");
  });

  it("AGENT-052: marks stuck when worked time exceeds estimate + buffer", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: 5_000,
        workedMs: 130_000,
        estimateSeconds: 100,
      }),
    ).toBe("stuck");
  });

  it("AGENT-038: still marks stuck from silence while waiting for an estimate", () => {
    expect(
      resolveAgentLiveProgressStallState({
        isWorking: true,
        msSinceLastActivity: AGENT_LIVE_PROGRESS_STALL_STUCK_MS,
        workedMs: 90_000,
        estimateSeconds: null,
      }),
    ).toBe("stuck");
  });
});
