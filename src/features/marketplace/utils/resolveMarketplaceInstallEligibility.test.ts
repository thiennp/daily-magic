import { describe, expect, it } from "vitest";

import { resolveMarketplaceInstallEligibility } from "@/features/marketplace/utils/resolveMarketplaceInstallEligibility";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

const onlineDevice: MyMacDevice = {
  id: "device-1",
  deviceLabel: "mac.local",
  displayName: "Mac",
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-01T00:00:00.000Z",
  isConnected: true,
  isOnline: true,
  lastHeartbeatAt: "2026-01-01T00:00:00.000Z",
};

describe("resolveMarketplaceInstallEligibility", () => {
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
