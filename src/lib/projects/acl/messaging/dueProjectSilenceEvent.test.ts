import { describe, expect, it } from "vitest";

import { dueProjectSilenceEvent } from "@/lib/projects/acl/messaging/dueProjectSilenceEvent";

const wokenAtMs = Date.parse("2026-10-05T08:00:00.000Z");
const at = (minutes: number, seconds = 0): number =>
  wokenAtMs + minutes * 60_000 + seconds * 1_000;

describe("dueProjectSilenceEvent", () => {
  it("fires timeout_5m at 5 minutes, not before", () => {
    const state = "awaiting_first_activity" as const;
    expect(dueProjectSilenceEvent({ state, wokenAtMs, nowMs: at(4, 59) })).toBe(
      null,
    );
    expect(dueProjectSilenceEvent({ state, wokenAtMs, nowMs: at(5) })).toBe(
      "timeout_5m",
    );
  });

  it("fires timeout_10m at 10 minutes in total, not before", () => {
    const state = "silent_5m_notified" as const;
    expect(dueProjectSilenceEvent({ state, wokenAtMs, nowMs: at(9, 59) })).toBe(
      null,
    );
    expect(dueProjectSilenceEvent({ state, wokenAtMs, nowMs: at(10) })).toBe(
      "timeout_10m",
    );
  });

  it("never fires outside the waiting states", () => {
    for (const state of [
      "processing",
      "status_reporting",
      "blocked_silent_10m",
      "done",
    ] as const) {
      expect(dueProjectSilenceEvent({ state, wokenAtMs, nowMs: at(30) })).toBe(
        null,
      );
    }
  });
});
