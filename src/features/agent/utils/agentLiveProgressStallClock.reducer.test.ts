import { describe, expect, it } from "vitest";

import {
  initialAgentLiveProgressStallClockState,
  resolveAgentLiveProgressWorkedMs,
} from "@/features/agent/utils/agentLiveProgressStallClock.reducer";

describe("resolveAgentLiveProgressWorkedMs (AGENT-061)", () => {
  it("counts from estimate receipt when available", () => {
    const clock = {
      ...initialAgentLiveProgressStallClockState(),
      workingStartedAt: 1_000,
      estimateReceivedAt: 5_000,
      nowMs: 8_000,
    };

    expect(resolveAgentLiveProgressWorkedMs({ isWorking: true, clock })).toBe(
      3_000,
    );
  });

  it("falls back to working start before estimate arrives", () => {
    const clock = {
      ...initialAgentLiveProgressStallClockState(),
      workingStartedAt: 2_000,
      estimateReceivedAt: null,
      nowMs: 6_000,
    };

    expect(resolveAgentLiveProgressWorkedMs({ isWorking: true, clock })).toBe(
      4_000,
    );
  });
});
