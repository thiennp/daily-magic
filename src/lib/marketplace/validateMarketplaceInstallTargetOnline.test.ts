import { beforeEach, describe, expect, it, vi } from "vitest";

import { MARKETPLACE_INSTALL_MAC_RECENT_NOT_LIVE_ERROR } from "@/lib/marketplace/marketplaceInstallMacErrors.constant";
import { validateMarketplaceInstallTarget } from "@/lib/marketplace/validateMarketplaceInstallTargetOnline";

const mocks = vi.hoisted(() => ({
  resolveDispatchTargetAgentClient: vi.fn(),
  isAgentWitchDeviceOrSuccessorOwnedByUser: vi.fn(),
  classifyAgentWitchDispatchUnavailability: vi.fn(),
  resolveCurrentAgentWitchDeviceId: vi.fn(),
  findAgentWitchDeviceById: vi.fn(),
  collectLiveAgentWitchDeviceIdsForUser: vi.fn(),
  listFreshRegistryDeviceIdsOnOtherInstances: vi.fn(),
  ensureAgentWitchDeviceSchema: vi.fn(),
}));

vi.mock("@/lib/agentWitch/resolveDispatchTargetAgentClient", () => ({
  resolveDispatchTargetAgentClient: mocks.resolveDispatchTargetAgentClient,
}));

vi.mock("@/lib/agentWitch/isAgentWitchDeviceOrSuccessorOwnedByUser", () => ({
  isAgentWitchDeviceOrSuccessorOwnedByUser:
    mocks.isAgentWitchDeviceOrSuccessorOwnedByUser,
}));

vi.mock("@/lib/agentWitch/classifyAgentWitchDispatchUnavailability", () => ({
  classifyAgentWitchDispatchUnavailability:
    mocks.classifyAgentWitchDispatchUnavailability,
}));

vi.mock("@/lib/agentWitch/resolveCurrentAgentWitchDeviceId", () => ({
  resolveCurrentAgentWitchDeviceId: mocks.resolveCurrentAgentWitchDeviceId,
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: mocks.findAgentWitchDeviceById,
}));

vi.mock("@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser", () => ({
  collectLiveAgentWitchDeviceIdsForUser:
    mocks.collectLiveAgentWitchDeviceIdsForUser,
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  listFreshRegistryDeviceIdsOnOtherInstances:
    mocks.listFreshRegistryDeviceIdsOnOtherInstances,
}));

vi.mock("@/lib/agentWitch/ensureAgentWitchDeviceSchema", () => ({
  ensureAgentWitchDeviceSchema: mocks.ensureAgentWitchDeviceSchema,
}));

vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));

describe("validateMarketplaceInstallTarget", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.resolveDispatchTargetAgentClient.mockResolvedValue(undefined);
    mocks.isAgentWitchDeviceOrSuccessorOwnedByUser.mockResolvedValue(true);
    mocks.classifyAgentWitchDispatchUnavailability.mockResolvedValue("offline");
    mocks.resolveCurrentAgentWitchDeviceId.mockResolvedValue("device-1");
    mocks.findAgentWitchDeviceById.mockResolvedValue({
      id: "device-1",
      lastSeenAt: new Date().toISOString(),
      revokedAt: null,
    });
    mocks.collectLiveAgentWitchDeviceIdsForUser.mockResolvedValue(new Set());
    mocks.listFreshRegistryDeviceIdsOnOtherInstances.mockResolvedValue(
      new Set(),
    );
    mocks.ensureAgentWitchDeviceSchema.mockResolvedValue(undefined);
  });

  it("allows install when dispatch target is live", async () => {
    mocks.resolveDispatchTargetAgentClient.mockResolvedValue({
      agentClient: { send: vi.fn() },
      deviceId: "device-1",
    });

    await expect(
      validateMarketplaceInstallTarget("user-1", "device-1"),
    ).resolves.toBeNull();
  });

  it("blocks owned Mac that is only recently seen (MARKETPLACE-002)", async () => {
    const recentLastSeen = new Date().toISOString();
    mocks.findAgentWitchDeviceById.mockResolvedValue({
      id: "device-1",
      lastSeenAt: recentLastSeen,
      revokedAt: null,
    });

    await expect(
      validateMarketplaceInstallTarget("user-1", "device-1"),
    ).resolves.toBe(MARKETPLACE_INSTALL_MAC_RECENT_NOT_LIVE_ERROR);
  });
});
