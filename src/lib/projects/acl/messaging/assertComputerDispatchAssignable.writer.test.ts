import { beforeEach, describe, expect, it, vi } from "vitest";

const findDevice = vi.fn();
const loadWriters = vi.fn();

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: (id: string) => findDevice(id),
}));
vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  listFreshRegistryDeviceIdsForUser: async () => new Set(),
}));
vi.mock("@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser", () => ({
  collectLiveAgentWitchDeviceIdsForUser: async () => new Set(),
}));
vi.mock("@/lib/agentWitch/getAgentWitchHub", () => ({
  getAgentWitchHub: () => ({}),
}));
vi.mock("@/lib/agentWitch/loadAgentWitchDeviceWriters", () => ({
  loadAgentWitchDeviceWriters: (id: string) => loadWriters(id),
}));

import { assertComputerDispatchAssignable } from "@/lib/projects/acl/messaging/assertComputerDispatchAssignable";

describe("assertComputerDispatchAssignable coding tool readiness", () => {
  const freshDevice = {
    id: "dev-1",
    revokedAt: null,
    lastSeenAt: new Date().toISOString(),
    installBundleVersion: "999",
  };
  const run = (writerAgent: string) =>
    assertComputerDispatchAssignable({
      deviceId: "dev-1",
      ownerUserId: "u1",
      writerAgent,
    });

  beforeEach(() => {
    findDevice.mockReset();
    loadWriters.mockReset();
    findDevice.mockResolvedValue(freshDevice);
  });

  it("rejects a tool the computer reported as not ready", async () => {
    loadWriters.mockResolvedValue([
      { writerAgent: "codex", ready: true },
      { writerAgent: "cursor", ready: false },
    ]);
    await expect(run("cursor")).resolves.toMatchObject({
      ok: false,
      cause: "writer_not_ready",
    });
    await expect(run("codex")).resolves.toEqual({ ok: true });
  });

  it("does not block when the computer never reported its tools", async () => {
    loadWriters.mockResolvedValue([]);
    await expect(run("cursor")).resolves.toEqual({ ok: true });
  });
});
