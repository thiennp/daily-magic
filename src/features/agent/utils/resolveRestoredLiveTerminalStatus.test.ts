import { describe, expect, it } from "vitest";

import { resolveRestoredLiveTerminalStatus } from "@/features/agent/utils/resolveRestoredLiveTerminalStatus";

const HOUR = 60 * 60 * 1000;
const nowMs = Date.parse("2026-10-08T21:00:00.000Z");

describe("resolveRestoredLiveTerminalStatus (ed42d8ce / 6253aa7e)", () => {
  it("a stored streaming session silent for 10 h restores as timed out", () => {
    expect(
      resolveRestoredLiveTerminalStatus({
        status: "streaming",
        lastAliveMs: [nowMs - 10 * HOUR, null],
        nowMs,
      }),
    ).toBe("timed_out");
  });

  it("a recent heartbeat keeps a live session live", () => {
    expect(
      resolveRestoredLiveTerminalStatus({
        status: "waiting_approval",
        lastAliveMs: [nowMs - 10 * HOUR, nowMs - 60_000],
        nowMs,
      }),
    ).toBe("waiting_approval");
  });

  it("leaves ended statuses and unknown times alone", () => {
    expect(
      resolveRestoredLiveTerminalStatus({
        status: "finished",
        lastAliveMs: [nowMs - 10 * HOUR],
        nowMs,
      }),
    ).toBe("finished");
    expect(
      resolveRestoredLiveTerminalStatus({
        status: "streaming",
        lastAliveMs: [Number.NaN, null],
        nowMs,
      }),
    ).toBe("streaming");
  });
});
