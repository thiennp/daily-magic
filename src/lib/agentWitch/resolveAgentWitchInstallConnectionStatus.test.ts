import { describe, expect, it } from "vitest";

import { resolveAgentWitchInstallConnectionStatus } from "@/lib/agentWitch/resolveAgentWitchInstallConnectionStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const device = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  deviceLabel: null,
  displayName: "Office Mac",
  dispatchPolicy: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-01T00:00:00.000Z",
  revokedAt: null,
  lastWakeError: null,
  installBundleVersion: "36",
  ...overrides,
});

describe("resolveAgentWitchInstallConnectionStatus", () => {
  it("HOME-025: install is unfinished until a Mac has a live WebSocket", () => {
    expect(
      resolveAgentWitchInstallConnectionStatus({
        devices: [device()],
        liveDeviceIds: new Set(),
      }),
    ).toEqual({
      finished: false,
      connectedDeviceCount: 0,
      claimedDeviceCount: 1,
    });
  });

  it("HOME-025: install is finished when a claimed Mac is connected", () => {
    expect(
      resolveAgentWitchInstallConnectionStatus({
        devices: [device()],
        liveDeviceIds: new Set(["device-1"]),
      }),
    ).toEqual({
      finished: true,
      connectedDeviceCount: 1,
      claimedDeviceCount: 1,
    });
  });

  it("HOME-025: returns zero counts when no Mac is claimed", () => {
    expect(
      resolveAgentWitchInstallConnectionStatus({
        devices: [],
        liveDeviceIds: new Set(),
      }),
    ).toEqual({
      finished: false,
      connectedDeviceCount: 0,
      claimedDeviceCount: 0,
    });
  });
});
