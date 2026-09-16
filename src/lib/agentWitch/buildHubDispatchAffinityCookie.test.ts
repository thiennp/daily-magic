import { describe, expect, it, vi } from "vitest";

import {
  buildHubDispatchAffinitySetCookie,
  resolveHubDispatchAffinityInstanceId,
} from "@/lib/agentWitch/buildHubDispatchAffinityCookie";

vi.mock("@/lib/agentWitch/getAgentWitchHubInstanceId", () => ({
  getAgentWitchHubInstanceId: () => "instance-local",
}));

vi.mock("@/lib/agentWitch/agentWitchConnectionRegistry", () => ({
  findLiveRegistryInstanceIdForDevice: vi.fn(async () => "instance-remote"),
}));

describe("buildHubDispatchAffinityCookie", () => {
  it("prefers the local hub instance when a Mac is live on this Node", async () => {
    const instanceId = await resolveHubDispatchAffinityInstanceId({
      userId: "user-1",
      devices: [
        { id: "device-a", presenceTier: "live_other_instance" },
        { id: "device-b", presenceTier: "live" },
      ],
    });

    expect(instanceId).toBe("instance-local");
  });

  it("sets affinity to the registry owner for live_other_instance Macs", async () => {
    const instanceId = await resolveHubDispatchAffinityInstanceId({
      userId: "user-1",
      devices: [{ id: "device-a", presenceTier: "live_other_instance" }],
    });

    expect(instanceId).toBe("instance-remote");
  });

  it("builds an HttpOnly SameSite cookie for load-balancer sticky routing", () => {
    expect(buildHubDispatchAffinitySetCookie("instance-remote")).toBe(
      "aw_hub_instance=instance-remote; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600",
    );
  });
});
