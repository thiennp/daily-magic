import { beforeEach, describe, expect, it, vi } from "vitest";

import { isDeviceLiveOnAnotherInstance } from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";
import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { buildTargetMacOfflineDispatchError } from "@/lib/dispatch/buildTargetMacOfflineDispatchError";

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistryQueries", () => ({
  isDeviceLiveOnAnotherInstance: vi.fn(async () => false),
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: vi.fn(),
}));

const buildDeviceRecord = (revokedAt: string | null) => ({
  id: "device-1",
  userId: "user-1",
  deviceLabel: "Studio-Mac#thien",
  displayName: null,
  dispatchPolicy: null,
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2020-01-01T00:00:00.000Z",
  revokedAt,
});

describe("buildTargetMacOfflineDispatchError", () => {
  beforeEach(() => {
    vi.mocked(isDeviceLiveOnAnotherInstance).mockResolvedValue(false);
    vi.mocked(findAgentWitchDeviceById).mockReset();
  });

  it("returns mac_replaced when the targeted row was revoked by a re-pair", async () => {
    vi.mocked(findAgentWitchDeviceById).mockResolvedValue(
      buildDeviceRecord("2026-01-02T00:00:00.000Z"),
    );

    const error = await buildTargetMacOfflineDispatchError(
      "device-1",
      "user-1",
    );

    expect(error.payload?.errorCode).toBe(
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_REPLACED,
    );
  });

  it("returns mac_offline when the row is active and genuinely stale", async () => {
    vi.mocked(findAgentWitchDeviceById).mockResolvedValue(
      buildDeviceRecord(null),
    );

    const error = await buildTargetMacOfflineDispatchError(
      "device-1",
      "user-1",
    );

    expect(error.payload?.errorCode).toBe(
      AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
    );
    expect(error.payload?.errorMessage).toBe(
      "The selected Mac is not online right now.",
    );
  });
});
