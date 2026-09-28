import { describe, expect, it } from "vitest";

import {
  isAgentWitchLastHeartbeatStale,
  resolveLocalAppHealthFileBadge,
} from "./resolveLocalAppHealthFileBadge";

describe("resolveLocalAppHealthFileBadge", () => {
  it("shows no heartbeat when lastHeartbeatAt is null", () => {
    expect(
      resolveLocalAppHealthFileBadge({
        lastHeartbeatAt: null,
        heartbeatIsStale: true,
      }),
    ).toBe("No heartbeat yet");
  });

  it("shows fresh when a heartbeat exists and is not stale", () => {
    expect(
      resolveLocalAppHealthFileBadge({
        lastHeartbeatAt: "2026-01-01T12:00:00.000Z",
        heartbeatIsStale: false,
      }),
    ).toBe("Fresh");
  });

  it("shows stale when heartbeat is old even without a health file", () => {
    expect(
      resolveLocalAppHealthFileBadge({
        lastHeartbeatAt: "2026-01-01T12:00:00.000Z",
        heartbeatIsStale: true,
      }),
    ).toBe("Stale");
  });
});

describe("isAgentWitchLastHeartbeatStale", () => {
  const nowMs = Date.parse("2026-01-01T12:00:30.000Z");

  it("treats null as stale", () => {
    expect(isAgentWitchLastHeartbeatStale(null, 60_000, nowMs)).toBe(true);
  });

  it("treats recent heartbeats as fresh", () => {
    expect(
      isAgentWitchLastHeartbeatStale("2026-01-01T11:59:31.000Z", 60_000, nowMs),
    ).toBe(false);
  });

  it("treats old heartbeats as stale", () => {
    expect(
      isAgentWitchLastHeartbeatStale("2026-01-01T11:58:00.000Z", 60_000, nowMs),
    ).toBe(true);
  });
});
