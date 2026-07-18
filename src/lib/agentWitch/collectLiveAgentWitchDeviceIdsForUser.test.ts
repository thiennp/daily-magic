import { describe, expect, it, vi } from "vitest";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import type { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import { collectLiveAgentWitchDeviceIdsForUser } from "@/lib/agentWitch/collectLiveAgentWitchDeviceIdsForUser";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

describe("collectLiveAgentWitchDeviceIdsForUser", () => {
  it("includes devices resolved from pairing token when hub deviceId is missing (AGENT-022)", async () => {
    vi.mocked(findAgentWitchDeviceByToken).mockResolvedValue({
      id: "device-1",
      userId: "user-1",
      deviceLabel: "Studio-Mac",
      displayName: null,
      claimedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: null,
      revokedAt: null,
      dispatchPolicy: null,
    });

    const pairingStore = {
      resolveClaimedPairing: vi.fn().mockResolvedValue({
        userId: "user-1",
        email: "user@example.com",
        claimedAt: "2026-01-01T00:00:00.000Z",
        deviceId: "device-1",
      }),
    } as unknown as AgentWitchPairingStore;
    const hub = new AgentWitchHub(pairingStore);
    hub.registerClient({
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send: () => undefined,
    });

    const liveIds = await collectLiveAgentWitchDeviceIdsForUser(hub, "user-1");

    expect([...liveIds]).toEqual(["device-1"]);
  });
});
