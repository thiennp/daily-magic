import { describe, expect, it, vi } from "vitest";

import { registerAgentWitchInstallFromMac } from "@/lib/agentWitch/registerAgentWitchInstallFromMac";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

vi.mock("@/lib/agentWitch/touchAgentWitchDeviceLastSeen", () => ({
  touchAgentWitchDeviceLastSeen: vi.fn(),
}));

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchPairingStore: vi.fn(() => ({
    touchLastSeen: vi.fn(),
  })),
}));

vi.mock("@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel", () => ({
  consolidateActiveAgentWitchDeviceByLabel: vi.fn(),
}));

vi.mock("@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion", () => ({
  updateAgentWitchDeviceInstallBundleVersion: vi.fn(),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { updateAgentWitchDeviceInstallBundleVersion } from "@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion";

describe("registerAgentWitchInstallFromMac", () => {
  it("AGENT-051: stores installBundleVersion reported after update", async () => {
    vi.mocked(findAgentWitchDeviceByToken).mockResolvedValue({
      id: "device-1",
      userId: "user-1",
      revokedAt: null,
    } as never);

    const result = await registerAgentWitchInstallFromMac({
      pairingToken: "b".repeat(64),
      deviceLabel: "Mac-Light-S#owner",
      installBundleVersion: "54",
    });

    expect(result).toEqual({ ok: true, deviceId: "device-1" });
    expect(updateAgentWitchDeviceInstallBundleVersion).toHaveBeenCalledWith({
      deviceId: "device-1",
      installBundleVersion: "54",
    });
  });
});
