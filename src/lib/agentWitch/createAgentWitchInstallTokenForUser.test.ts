import { beforeEach, describe, expect, it, vi } from "vitest";

const claimAgentWitchDevice = vi.fn();
const revokePendingInstallDevicesForUser = vi.fn();
const reusePendingConnectPlaceholder = vi.fn();

vi.mock("@/lib/agentWitch/reusePendingConnectPlaceholder", () => ({
  reusePendingConnectPlaceholder: (...args: readonly unknown[]) =>
    reusePendingConnectPlaceholder(...args),
}));

vi.mock("@/lib/agentWitch/claimAgentWitchDevice", () => ({
  claimAgentWitchDevice: (...args: readonly unknown[]) =>
    claimAgentWitchDevice(...args),
}));

vi.mock("@/lib/agentWitch/revokePendingInstallDevicesForUser", () => ({
  revokePendingInstallDevicesForUser: (...args: readonly unknown[]) =>
    revokePendingInstallDevicesForUser(...args),
}));

import { createAgentWitchInstallTokenForUser } from "@/lib/agentWitch/createAgentWitchInstallTokenForUser";

describe("createAgentWitchInstallTokenForUser (HOME-059)", () => {
  beforeEach(() => {
    claimAgentWitchDevice.mockReset();
    revokePendingInstallDevicesForUser.mockReset();
    claimAgentWitchDevice.mockResolvedValue({ id: "device-1" });
    revokePendingInstallDevicesForUser.mockResolvedValue(undefined);
    reusePendingConnectPlaceholder.mockReset();
    reusePendingConnectPlaceholder.mockResolvedValue(false);
  });

  it("reserves a pending device, then drops older unused links", async () => {
    const result = await createAgentWitchInstallTokenForUser({
      userId: "user-1",
      email: "Test@AgentWitch.com",
      origin: "https://www.agentwitch.com",
    });

    expect(claimAgentWitchDevice).toHaveBeenCalledWith({
      pairingToken: result.pairingToken,
      userId: "user-1",
      deviceLabel: null,
      recordLastSeen: false,
    });
    expect(revokePendingInstallDevicesForUser).toHaveBeenCalledWith({
      userId: "user-1",
      protectTokenHash: result.tokenHash,
    });
    expect(claimAgentWitchDevice.mock.invocationCallOrder[0]).toBeLessThan(
      revokePendingInstallDevicesForUser.mock.invocationCallOrder[0] ?? 0,
    );
    expect(result.installCommand).toContain(result.pairingToken);
    expect(result.tokenHash).toHaveLength(64);
  });

  it("reuses the newest pending pairing row instead of minting another (bca9b1eb)", async () => {
    reusePendingConnectPlaceholder.mockResolvedValue(true);
    const result = await createAgentWitchInstallTokenForUser({
      userId: "user-1",
      email: "t@agentwitch.com",
      origin: "https://www.agentwitch.com",
    });

    expect(reusePendingConnectPlaceholder).toHaveBeenCalledWith({
      userId: "user-1",
      tokenHash: result.tokenHash,
    });
    expect(claimAgentWitchDevice).not.toHaveBeenCalled();
    expect(revokePendingInstallDevicesForUser).toHaveBeenCalledWith({
      userId: "user-1",
      protectTokenHash: result.tokenHash,
    });
  });
});
