import { describe, expect, it } from "vitest";

import { resolveMarketplaceInstallEligibility } from "@/features/marketplace/utils/resolveMarketplaceInstallEligibility";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

const onlineDevice: MyMacDevice = {
  id: "device-1",
  tokenHash: null,
  deviceLabel: "mac.local",
  displayName: "Mac",
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-01T00:00:00.000Z",
  isConnected: true,
  isOnline: true,
  lastHeartbeatAt: "2026-01-01T00:00:00.000Z",
  installBundleVersion: "35",
  wakePort: 47892,
};

const offlineDevice: MyMacDevice = {
  ...onlineDevice,
  isConnected: false,
  isOnline: false,
  presenceTier: "offline",
  lastHeartbeatAt: null,
};

describe("resolveMarketplaceInstallEligibility", () => {
  it("disables install for official preset when Mac is offline (MARKETPLACE-002)", () => {
    const result = resolveMarketplaceInstallEligibility({
      capabilityId: "preset:vibe-coding-app-feature",
      selectedDevice: offlineDevice,
      isWakeServerReachable: false,
      status: "idle",
    });

    expect(result.canInstall).toBe(false);
  });

  it("disables install after success (MARKETPLACE-001)", () => {
    const result = resolveMarketplaceInstallEligibility({
      capabilityId: "preset:weekly-team-status",
      selectedDevice: onlineDevice,
      isWakeServerReachable: true,
      status: "done",
    });

    expect(result.canInstall).toBe(false);
  });
});
