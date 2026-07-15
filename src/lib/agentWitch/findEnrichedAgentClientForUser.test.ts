import { describe, expect, it, vi } from "vitest";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

describe("findEnrichedAgentClientForUser", () => {
  it("matches a connected Mac after enriching missing device ids", async () => {
    const pairingStore = new AgentWitchPairingStore();
    const hub = new AgentWitchHub(pairingStore);

    vi.spyOn(pairingStore, "resolveClaimedPairing").mockResolvedValue({
      userId: "user-1",
      email: "user@example.com",
      claimedAt: "2026-01-01T00:00:00.000Z",
      deviceId: "device-1",
    });

    hub.registerClient({
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send: () => undefined,
    });

    const matched = await findEnrichedAgentClientForUser(
      hub,
      "user-1",
      "device-1",
    );

    expect(matched?.id).toBe("agent-1");
  });

  it("AGENT-002: matches by pairing token when hub device id is stale", async () => {
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

    const pairingStore = new AgentWitchPairingStore();
    const hub = new AgentWitchHub(pairingStore);

    hub.registerClient({
      id: "agent-1",
      role: "agent",
      userId: "user-1",
      deviceId: "stale-device-id",
      pairingToken: "pair-token",
      send: () => undefined,
    });

    const matched = await findEnrichedAgentClientForUser(
      hub,
      "user-1",
      "device-1",
    );

    expect(matched?.id).toBe("agent-1");
  });
});
