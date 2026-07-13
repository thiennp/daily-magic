import { describe, expect, it } from "vitest";

import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

const baseDevice = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  deviceLabel: "MacBook Pro",
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-02T00:00:00.000Z",
  revokedAt: null,
  dispatchPolicy: null,
  ...overrides,
});

const onlineClient = (
  overrides: Partial<AgentWitchHubClient> = {},
): AgentWitchHubClient => ({
  id: "agent-1",
  role: "agent",
  deviceId: "device-1",
  deviceLabel: "Johns-MacBook",
  lastHeartbeatAt: "2026-01-03T12:00:00.000Z",
  send: () => undefined,
  ...overrides,
});

describe("buildAgentWitchDevicesWithOnlineStatus", () => {
  it("marks devices online when a matching agent client is connected", () => {
    const result = buildAgentWitchDevicesWithOnlineStatus(
      [baseDevice()],
      [onlineClient()],
    );

    expect(result).toEqual([
      expect.objectContaining({
        id: "device-1",
        isOnline: true,
        deviceLabel: "Johns-MacBook",
        lastHeartbeatAt: "2026-01-03T12:00:00.000Z",
      }),
    ]);
  });

  it("marks devices offline when no matching agent client exists", () => {
    const result = buildAgentWitchDevicesWithOnlineStatus(
      [baseDevice()],
      [],
    );

    expect(result[0]).toMatchObject({
      id: "device-1",
      isOnline: false,
      deviceLabel: "MacBook Pro",
      lastHeartbeatAt: null,
    });
  });
});
