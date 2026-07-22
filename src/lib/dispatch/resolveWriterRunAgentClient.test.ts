import { describe, expect, it, vi } from "vitest";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import { resolveClaudeRunAgentClient } from "@/lib/dispatch/resolveWriterRunAgentClient";

vi.mock("@/lib/agentWitch/isAgentWitchDeviceOwnedByUser", () => ({
  default: vi.fn(async () => true),
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

vi.mock("@/lib/agentWitch/findAgentWitchDeviceById", () => ({
  findAgentWitchDeviceById: vi.fn(async () => null),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

describe("resolveClaudeRunAgentClient", () => {
  it("finds the live Mac when hub deviceId is stale (pairing-token match)", async () => {
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

    const result = await resolveClaudeRunAgentClient({
      runtime: hub,
      senderUserId: "user-1",
      executorUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result).toEqual({
      ok: true,
      agentClient: expect.objectContaining({ id: "agent-1" }),
      deviceId: "device-1",
    });
  });

  it("does not treat a fresh last_seen alone as dispatch-ready (AGENT-022)", async () => {
    const pairingStore = new AgentWitchPairingStore();
    const hub = new AgentWitchHub(pairingStore);

    const result = await resolveClaudeRunAgentClient({
      runtime: hub,
      senderUserId: "user-1",
      executorUserId: "user-1",
      targetDeviceId: "device-1",
    });

    expect(result.ok).toBe(false);
    if (result.ok) {
      return;
    }
    expect(result.error.payload?.errorMessage).toBe(
      "The selected Mac is not online right now.",
    );
  });
});
