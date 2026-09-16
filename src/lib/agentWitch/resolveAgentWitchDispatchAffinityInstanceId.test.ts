import { describe, expect, it, vi } from "vitest";

import { resolveAgentWitchDispatchAffinityInstanceId } from "@/lib/agentWitch/resolveAgentWitchDispatchAffinityInstanceId";

vi.mock("@/lib/agentWitch/getAgentWitchHubInstanceId", () => ({
  getAgentWitchHubInstanceId: () => "local-instance",
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistryQueries", () => ({
  findFreshHubInstanceIdForDevice: vi.fn(async () => "remote-instance"),
}));

describe("resolveAgentWitchDispatchAffinityInstanceId", () => {
  it("prefers the local hub instance when a live socket exists on this process", async () => {
    const instanceId = await resolveAgentWitchDispatchAffinityInstanceId({
      userId: "user-1",
      localLiveDeviceIds: new Set(["device-a"]),
      remoteLiveDeviceIds: new Set(["device-b"]),
    });

    expect(instanceId).toBe("local-instance");
  });

  it("returns the registry owner when the Mac is only live on another instance", async () => {
    const instanceId = await resolveAgentWitchDispatchAffinityInstanceId({
      userId: "user-1",
      localLiveDeviceIds: new Set(),
      remoteLiveDeviceIds: new Set(["device-b"]),
    });

    expect(instanceId).toBe("remote-instance");
  });
});
