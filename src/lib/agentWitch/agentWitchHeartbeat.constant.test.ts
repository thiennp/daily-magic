import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_ACTIVE_THRESHOLD_MS,
  AGENT_WITCH_HEARTBEAT_INTERVAL_MS,
  AGENT_WITCH_ONLINE_THRESHOLD_MS,
  isAgentWitchDeviceRecentlySeen,
} from "@/lib/agentWitch/agentWitchHeartbeat.constant";

describe("isAgentWitchDeviceRecentlySeen", () => {
  it("returns true inside the online threshold", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchDeviceRecentlySeen("2026-01-01T11:58:31.000Z", nowMs),
    ).toBe(true);
  });

  it("returns false outside the online threshold", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchDeviceRecentlySeen("2026-01-01T11:58:29.000Z", nowMs),
    ).toBe(false);
  });

  it("uses a 90 second threshold", () => {
    expect(AGENT_WITCH_ONLINE_THRESHOLD_MS).toBe(90_000);
  });

  it("supports a custom active threshold", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchDeviceRecentlySeen(
        "2026-01-01T11:59:31.000Z",
        nowMs,
        AGENT_WITCH_ACTIVE_THRESHOLD_MS,
      ),
    ).toBe(true);
    expect(AGENT_WITCH_ACTIVE_THRESHOLD_MS).toBe(
      AGENT_WITCH_HEARTBEAT_INTERVAL_MS,
    );
  });
});
