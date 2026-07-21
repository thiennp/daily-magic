import { describe, expect, it } from "vitest";

import {
  agentLiveWaveWorkingClockReducer,
  initialAgentLiveWaveWorkingClock,
} from "@/features/agent/utils/agentLiveWaveWorkingClock";

describe("agentLiveWaveWorkingClockReducer", () => {
  it("starts timers for new working ids and preserves existing ones", () => {
    const initial = initialAgentLiveWaveWorkingClock();
    const synced = agentLiveWaveWorkingClockReducer(initial, {
      type: "sync",
      workingIds: ["1.1"],
      at: 1000,
    });
    expect(synced.startedAtById["1.1"]).toBe(1000);

    const again = agentLiveWaveWorkingClockReducer(synced, {
      type: "sync",
      workingIds: ["1.1", "1.2"],
      at: 2000,
    });
    expect(again.startedAtById["1.1"]).toBe(1000);
    expect(again.startedAtById["1.2"]).toBe(2000);

    const dropped = agentLiveWaveWorkingClockReducer(again, {
      type: "sync",
      workingIds: ["1.2"],
      at: 3000,
    });
    expect(dropped.startedAtById["1.1"]).toBeUndefined();
    expect(dropped.startedAtById["1.2"]).toBe(2000);
  });
});
