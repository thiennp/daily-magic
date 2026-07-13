import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_ONLINE_THRESHOLD_MS,
  isAgentWitchDeviceRecentlySeen,
} from "@/lib/agentWitch/agentWitchHeartbeat.constant";

describe("isAgentWitchDeviceRecentlySeen", () => {
  it("returns true inside the online threshold", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchDeviceRecentlySeen(
        "2026-01-01T11:59:30.000Z",
        nowMs,
      ),
    ).toBe(true);
  });

  it("returns false outside the online threshold", () => {
    const nowMs = Date.parse("2026-01-01T12:00:00.000Z");

    expect(
      isAgentWitchDeviceRecentlySeen(
        "2026-01-01T11:58:00.000Z",
        nowMs,
      ),
    ).toBe(false);
  });

  it("uses a 45 second threshold", () => {
    expect(AGENT_WITCH_ONLINE_THRESHOLD_MS).toBe(45_000);
  });
});
