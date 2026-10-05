import { describe, expect, it } from "vitest";

import { dueProjectSilenceEvent } from "@/lib/projects/acl/messaging/dueProjectSilenceEvent";

const lastActivityAtMs = Date.parse("2026-10-05T08:00:00.000Z");
const at = (minutes: number, seconds = 0): number =>
  lastActivityAtMs + minutes * 60_000 + seconds * 1_000;

describe("dueProjectSilenceEvent", () => {
  it.each([
    "awaiting_first_activity",
    "processing",
    "status_reporting",
  ] as const)(
    "fires timeout_5m from %s at 5 minutes after the last activity",
    (state) => {
      expect(
        dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(4, 59) }),
      ).toBe(null);
      expect(
        dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(5) }),
      ).toBe("timeout_5m");
      expect(
        dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(30) }),
      ).toBe("timeout_5m");
    },
  );

  it("fires timeout_10m from silent_5m_notified at 10 minutes, not before", () => {
    const state = "silent_5m_notified" as const;
    expect(
      dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(9, 59) }),
    ).toBe(null);
    expect(
      dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(10) }),
    ).toBe("timeout_10m");
  });

  it.each([
    "dispatched",
    "blocked_silent_10m",
    "done",
    "blocked",
    "acked",
  ] as const)("never fires from %s", (state) => {
    expect(
      dueProjectSilenceEvent({ state, lastActivityAtMs, nowMs: at(60) }),
    ).toBe(null);
  });
});
