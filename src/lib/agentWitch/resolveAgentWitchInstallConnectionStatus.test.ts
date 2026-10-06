import { describe, expect, it } from "vitest";

import { resolveAgentWitchInstallConnectionStatus } from "@/lib/agentWitch/resolveAgentWitchInstallConnectionStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const device = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  platform: "mac",
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
  it("HOME-025: install is unfinished until a computer has a live WebSocket", () => {
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

  it("HOME-025: returns zero counts when no computer is claimed", () => {
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

  it("HOME-065 Soft HOLD: finished requires the minted tokenHash to be live, not any account Mac", () => {
    expect(
      resolveAgentWitchInstallConnectionStatus({
        devices: [
          device({ id: "other-live", tokenHash: "hash-other" }),
          device({ id: "minted", tokenHash: "hash-minted", installBundleVersion: null }),
        ],
        liveDeviceIds: new Set(["other-live"]),
        expectedTokenHash: "hash-minted",
      }),
    ).toEqual({
      finished: false,
      connectedDeviceCount: 1,
      claimedDeviceCount: 2,
    });

    expect(
      resolveAgentWitchInstallConnectionStatus({
        devices: [
          device({ id: "other-live", tokenHash: "hash-other" }),
          device({ id: "minted", tokenHash: "HASH-MINTED" }),
        ],
        liveDeviceIds: new Set(["other-live", "minted"]),
        expectedTokenHash: "hash-minted",
      }),
    ).toEqual({
      finished: true,
      connectedDeviceCount: 2,
      claimedDeviceCount: 2,
    });
  });
});
