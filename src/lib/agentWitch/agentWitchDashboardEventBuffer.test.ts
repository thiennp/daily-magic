import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  currentDashboardEventSeq,
  enqueueDashboardUserEvent,
  latestDashboardUserEventSeq,
  readDashboardUserEventsAfter,
} from "@/lib/agentWitch/agentWitchDashboardEventBuffer";
import {
  resolveDashboardStreamStartSeq,
  waitForDashboardUserEvents,
} from "@/lib/agentWitch/agentWitchDashboardEventStream";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

const msg = (marker: string): AgentWitchMessage =>
  ({
    type: "run.heartbeat",
    payload: { marker },
  }) as unknown as AgentWitchMessage;

/** 9c8a811d / 662eae04: SSE streams for one user must never steal events. */
describe("agentWitchDashboardEventBuffer fan-out", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("delivers one event to every waiting stream (no competing consumers)", async () => {
    const userId = "user-two-streams";
    const start = latestDashboardUserEventSeq(userId);
    const floater = waitForDashboardUserEvents(userId, start, 10_000);
    const harness = waitForDashboardUserEvents(userId, start, 10_000);

    enqueueDashboardUserEvent(userId, msg("input_required"));

    const [a, b] = await Promise.all([floater, harness]);
    expect(a.map((e) => e.raw)).toEqual(b.map((e) => e.raw));
    expect(a).toHaveLength(1);
    expect(a[0]?.raw).toContain("input_required");
  });

  it("an aborted (closed) stream no longer consumes events", async () => {
    const userId = "user-zombie";
    const start = latestDashboardUserEventSeq(userId);
    const closed = new AbortController();
    const zombie = waitForDashboardUserEvents(
      userId,
      start,
      10_000,
      closed.signal,
    );
    closed.abort();
    await expect(zombie).resolves.toEqual([]);

    const live = waitForDashboardUserEvents(userId, start, 10_000);
    enqueueDashboardUserEvent(userId, msg("result"));
    const events = await live;
    expect(events.map((e) => e.raw).join()).toContain("result");
  });

  it("times out with no events, then a later read still sees new events", async () => {
    const userId = "user-timeout";
    const start = latestDashboardUserEventSeq(userId);
    const waiting = waitForDashboardUserEvents(userId, start, 1_000);
    vi.advanceTimersByTime(1_001);
    await expect(waiting).resolves.toEqual([]);

    enqueueDashboardUserEvent(userId, msg("late"));
    expect(readDashboardUserEventsAfter(userId, start)).toHaveLength(1);
  });

  it("prunes events older than 120 s", () => {
    const userId = "user-prune";
    const start = latestDashboardUserEventSeq(userId);
    vi.setSystemTime(new Date(1_000));
    enqueueDashboardUserEvent(userId, msg("old"));
    vi.setSystemTime(new Date(122_001));
    enqueueDashboardUserEvent(userId, msg("new"));

    const raws = readDashboardUserEventsAfter(userId, start).map((e) => e.raw);
    expect(raws).toHaveLength(1);
    expect(raws[0]).toContain("new");
  });

  it("resumes after Last-Event-ID, and ignores an id from an older process", () => {
    const userId = "user-resume";
    enqueueDashboardUserEvent(userId, msg("a"));
    const afterA = latestDashboardUserEventSeq(userId);
    enqueueDashboardUserEvent(userId, msg("b"));
    const latest = latestDashboardUserEventSeq(userId);

    expect(resolveDashboardStreamStartSeq(userId, String(afterA))).toBe(afterA);
    expect(resolveDashboardStreamStartSeq(userId, null)).toBe(latest);
    expect(resolveDashboardStreamStartSeq(userId, "junk")).toBe(latest);
    expect(
      resolveDashboardStreamStartSeq(
        userId,
        String(currentDashboardEventSeq() + 50),
      ),
    ).toBe(latest);
  });
});
