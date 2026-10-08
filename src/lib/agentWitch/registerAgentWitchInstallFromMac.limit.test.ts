import { describe, expect, it, vi } from "vitest";

const touchLastSeen = vi.fn();
const updateBundle = vi.fn();

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: async () => ({
    id: "device-6",
    userId: "user-1",
    revokedAt: null,
  }),
}));
vi.mock("@/lib/agentWitch/admitAgentWitchPlaceholderCheckIn", () => ({
  admitAgentWitchPlaceholderCheckIn: async () => ({
    ok: false,
    code: "computer_limit",
    errorMessage: "This plan allows up to 5 computers",
  }),
}));
vi.mock("@/lib/agentWitch/touchAgentWitchDeviceLastSeen", () => ({
  touchAgentWitchDeviceLastSeen: (...args: readonly unknown[]) =>
    touchLastSeen(...args),
}));
vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchPairingStore: () => ({ touchLastSeen: vi.fn() }),
}));
vi.mock("@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel", () => ({
  consolidateActiveAgentWitchDeviceByLabel: vi.fn(),
}));
vi.mock("@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion", () => ({
  updateAgentWitchDeviceInstallBundleVersion: (...args: readonly unknown[]) =>
    updateBundle(...args),
}));
vi.mock("@/lib/agentWitch/updateAgentWitchDeviceWakePort", () => ({
  updateAgentWitchDeviceWakePort: vi.fn(),
}));
vi.mock("@/lib/agentWitch/updateAgentWitchDevicePlatform", () => ({
  updateAgentWitchDevicePlatform: vi.fn(),
}));

import { registerAgentWitchInstallFromMac } from "@/lib/agentWitch/registerAgentWitchInstallFromMac";

describe("registerAgentWitchInstallFromMac computer limit (6abb783e)", () => {
  it("refuses a placeholder check-in past the limit before it becomes a computer", async () => {
    const result = await registerAgentWitchInstallFromMac({
      pairingToken: "c".repeat(64),
      deviceLabel: "Sixth-Mac#owner",
      installBundleVersion: "323",
    });

    expect(result).toEqual({
      ok: false,
      code: "computer_limit",
      errorMessage: "This plan allows up to 5 computers",
    });
    expect(touchLastSeen).not.toHaveBeenCalled();
    expect(updateBundle).not.toHaveBeenCalled();
  });
});
