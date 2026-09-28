import { describe, expect, it } from "vitest";

import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";

describe("mapAgentWitchDeviceRow wakePort (HOME-061)", () => {
  const baseRow = {
    id: "device-1",
    user_id: "user-1",
    token_hash: "abc",
    platform: "mac",
    device_label: "MKX",
    display_name: null,
    dispatch_policy: null,
    claimed_at: "2026-09-28T00:00:00.000Z",
    last_seen_at: null,
    revoked_at: null,
    public_key: null,
    preferred_writer: null,
    last_wake_error: null,
    last_wake_error_at: null,
    install_bundle_version: "157",
  };

  it("maps numeric wake_port", () => {
    expect(
      mapAgentWitchDeviceRow({ ...baseRow, wake_port: 50199 }).wakePort,
    ).toBe(50199);
  });

  it("maps string wake_port from drivers that stringify integers", () => {
    expect(
      mapAgentWitchDeviceRow({ ...baseRow, wake_port: "50199" }).wakePort,
    ).toBe(50199);
  });

  it("returns null when wake_port is missing", () => {
    expect(mapAgentWitchDeviceRow({ ...baseRow }).wakePort).toBeNull();
  });
});
