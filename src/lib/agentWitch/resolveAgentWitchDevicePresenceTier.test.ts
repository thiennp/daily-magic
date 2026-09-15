import { describe, expect, it } from "vitest";

import { resolveAgentWitchDevicePresenceTier } from "@/lib/agentWitch/resolveAgentWitchDevicePresenceTier";

describe("resolveAgentWitchDevicePresenceTier", () => {
  it("prefers local live over remote registry", () => {
    const tier = resolveAgentWitchDevicePresenceTier({
      deviceId: "device-1",
      lastSeenAt: null,
      localLiveDeviceIds: new Set(["device-1"]),
      remoteLiveDeviceIds: new Set(["device-1"]),
    });

    expect(tier).toBe("live");
  });

  it("marks registry-only devices as live on another instance", () => {
    const tier = resolveAgentWitchDevicePresenceTier({
      deviceId: "device-1",
      lastSeenAt: null,
      localLiveDeviceIds: new Set(),
      remoteLiveDeviceIds: new Set(["device-1"]),
    });

    expect(tier).toBe("live_other_instance");
  });
});
