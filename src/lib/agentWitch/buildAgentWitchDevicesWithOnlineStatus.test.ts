import { describe, expect, it } from "vitest";

import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const baseDevice = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  deviceLabel: "MacBook Pro",
  displayName: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-02T00:00:00.000Z",
  revokedAt: null,
  dispatchPolicy: null,
  ...overrides,
});

describe("buildAgentWitchDevicesWithOnlineStatus", () => {
  it("marks fresh last_seen without a live hub socket as recent only (AGENT-022)", () => {
    const lastSeenAt = new Date().toISOString();
    const result = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ lastSeenAt }),
    ]);

    expect(result[0]).toMatchObject({
      id: "device-1",
      isConnected: false,
      isOnline: true,
      lastHeartbeatAt: lastSeenAt,
    });
  });

  it("marks live hub devices connected even when lastSeen is stale (AGENT-018)", () => {
    const result = buildAgentWitchDevicesWithOnlineStatus(
      [baseDevice({ lastSeenAt: "2020-01-01T00:00:00.000Z" })],
      new Set(["device-1"]),
    );

    expect(result[0]).toMatchObject({
      isConnected: true,
      isOnline: true,
    });
  });

  it("marks devices offline when last seen is stale", () => {
    const result = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ lastSeenAt: "2020-01-01T00:00:00.000Z" }),
    ]);

    expect(result[0]).toMatchObject({
      id: "device-1",
      isConnected: false,
      isOnline: false,
      deviceLabel: "MacBook Pro",
      lastHeartbeatAt: null,
    });
  });

  it("marks devices as seen recently but not connected after the active window", () => {
    const lastSeenAt = new Date(Date.now() - 60_000).toISOString();
    const result = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ lastSeenAt }),
    ]);

    expect(result[0]).toMatchObject({
      isConnected: false,
      isOnline: true,
      lastHeartbeatAt: lastSeenAt,
    });
  });

  it("keeps saved display names from the device record", () => {
    const lastSeenAt = new Date().toISOString();
    const result = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({
        displayName: "Work Mac",
        deviceLabel: "Studio-MacBook",
        lastSeenAt,
      }),
    ]);

    expect(result[0]).toMatchObject({
      deviceLabel: "Studio-MacBook",
      displayName: "Work Mac",
    });
  });
});
