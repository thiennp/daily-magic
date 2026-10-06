import { beforeEach, describe, expect, it, vi } from "vitest";

const findDevice = vi.fn();
const listRegistry = vi.fn();
const collectLive = vi.fn();

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: (id: string) => findDevice(id),
}));
vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  listFreshRegistryDeviceIdsForUser: (userId: string) => listRegistry(userId),
}));
vi.mock("@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser", () => ({
  collectLiveAgentWitchDeviceIdsForUser: (...args: unknown[]) =>
    collectLive(...args),
}));
vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));

import { assertComputerDispatchAssignable } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";

describe("assertComputerDispatchAssignable", () => {
  beforeEach(() => {
    findDevice.mockReset();
    listRegistry.mockReset();
    collectLive.mockReset();
    listRegistry.mockResolvedValue(new Set());
    collectLive.mockResolvedValue(new Set());
  });

  it("offline when device missing", async () => {
    findDevice.mockResolvedValue(null);
    await expect(
      assertComputerDispatchAssignable({
        deviceId: "dev-1",
        ownerUserId: "u1",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
  });

  it("offline when not live and last_seen stale", async () => {
    findDevice.mockResolvedValue({
      id: "dev-1",
      revokedAt: null,
      lastSeenAt: "2020-01-01T00:00:00.000Z",
      installBundleVersion: "267",
    });
    await expect(
      assertComputerDispatchAssignable({
        deviceId: "dev-1",
        ownerUserId: "u1",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "offline",
    });
  });

  it("too_old when online but bundle below connect/task floor", async () => {
    findDevice.mockResolvedValue({
      id: "dev-1",
      revokedAt: null,
      lastSeenAt: new Date().toISOString(),
      installBundleVersion: "0",
    });
    listRegistry.mockResolvedValue(new Set(["dev-1"]));
    await expect(
      assertComputerDispatchAssignable({
        deviceId: "dev-1",
        ownerUserId: "u1",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "computer_not_assignable",
      cause: "too_old",
    });
  });

  it("ok when live + bundle meets floors", async () => {
    findDevice.mockResolvedValue({
      id: "dev-1",
      revokedAt: null,
      lastSeenAt: new Date().toISOString(),
      installBundleVersion: "267",
    });
    collectLive.mockResolvedValue(new Set(["dev-1"]));
    await expect(
      assertComputerDispatchAssignable({
        deviceId: "dev-1",
        ownerUserId: "u1",
      }),
    ).resolves.toEqual({ ok: true });
  });
});
