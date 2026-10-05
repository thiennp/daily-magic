import { describe, expect, it } from "vitest";

import buildAgentWitchDevicesWithOnlineStatus from "@/lib/agentWitch/buildAgentWitchDevicesWithOnlineStatus";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const baseDevice = (
  overrides: Partial<AgentWitchDeviceRecord> = {},
): AgentWitchDeviceRecord => ({
  id: "device-1",
  userId: "user-1",
  platform: "mac",
  deviceLabel: "MacBook Pro",
  displayName: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-01-02T00:00:00.000Z",
  revokedAt: null,
  dispatchPolicy: null,
  ...overrides,
});

describe("buildAgentWitchDevicesWithOnlineStatus connectVersionStatus", () => {
  it("sets connectVersionStatus from installBundleVersion", () => {
    const ok = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ installBundleVersion: "35" }),
    ]);
    const tooOld = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ installBundleVersion: null }),
    ]);
    const behind = buildAgentWitchDevicesWithOnlineStatus([
      baseDevice({ installBundleVersion: "34" }),
    ]);

    expect(ok[0]?.connectVersionStatus).toBe("ok");
    expect(tooOld[0]?.connectVersionStatus).toBe("too_old");
    expect(behind[0]?.connectVersionStatus).toBe("too_old");
  });
});
