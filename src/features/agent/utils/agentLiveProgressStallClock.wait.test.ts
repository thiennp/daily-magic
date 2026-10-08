import { describe, expect, it } from "vitest";

import {
  agentLiveProgressStallClockReducer as reduce,
  initialAgentLiveProgressStallClockState,
  resolveAgentLiveProgressWorkedMs,
} from "@/features/agent/utils/agentLiveProgressStallClock.reducer";

const worked = (
  clock: ReturnType<typeof initialAgentLiveProgressStallClockState>,
) => resolveAgentLiveProgressWorkedMs({ isWorking: true, clock });

describe("agentLiveProgressStallClock wait freeze (afae8216)", () => {
  it("does not count time spent waiting on the user", () => {
    const started = reduce(initialAgentLiveProgressStallClockState(), {
      type: "activity",
      at: 1_000,
    });
    const ticked = reduce(started, { type: "tick", at: 1_500 });
    expect(worked(ticked)).toBe(500);

    const waiting = reduce(ticked, { type: "waitStart", at: 1_500 });
    const waitedTick = reduce(waiting, { type: "tick", at: 2_500 });
    expect(worked(waitedTick)).toBe(500);

    const resumed = reduce(waitedTick, { type: "waitEnd", at: 2_500 });
    expect(worked(reduce(resumed, { type: "tick", at: 3_000 }))).toBe(1_000);
  });

  it("ignores a waitEnd without a waitStart", () => {
    const state = initialAgentLiveProgressStallClockState();
    expect(reduce(state, { type: "waitEnd", at: 5 })).toBe(state);
  });
});
