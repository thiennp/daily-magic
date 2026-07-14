import { describe, expect, it, vi } from "vitest";

import { enrichOnlineAgentClients } from "@/lib/agentWitch/enrichOnlineAgentClients";
import type { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";

const agentClient = (
  overrides: Partial<AgentWitchHubClient> = {},
): AgentWitchHubClient => ({
  id: "agent-1",
  role: "agent",
  pairingToken: "pair-token",
  send: () => undefined,
  ...overrides,
});

describe("enrichOnlineAgentClients", () => {
  it("fills missing userId and deviceId from claimed pairing", async () => {
    const pairingStore = {
      resolveClaimedPairing: vi.fn().mockResolvedValue({
        userId: "user-1",
        email: "user@example.com",
        claimedAt: "2026-01-01T00:00:00.000Z",
        deviceId: "device-1",
      }),
    } as unknown as AgentWitchPairingStore;

    const enriched = await enrichOnlineAgentClients(pairingStore, [
      agentClient(),
    ]);

    expect(enriched[0]).toMatchObject({
      userId: "user-1",
      deviceId: "device-1",
    });
    expect(findAgentWitchDeviceByToken).not.toHaveBeenCalled();
  });

  it("falls back to the database device when hub metadata is incomplete", async () => {
    vi.mocked(findAgentWitchDeviceByToken).mockResolvedValue({
      id: "device-2",
      userId: "user-2",
      deviceLabel: "Studio-Mac",
      displayName: null,
      claimedAt: "2026-01-01T00:00:00.000Z",
      lastSeenAt: null,
      revokedAt: null,
      dispatchPolicy: null,
    });

    const pairingStore = {
      resolveClaimedPairing: vi.fn().mockResolvedValue(null),
    } as unknown as AgentWitchPairingStore;

    const enriched = await enrichOnlineAgentClients(pairingStore, [
      agentClient({ pairingToken: "other-token" }),
    ]);

    expect(enriched[0]).toMatchObject({
      userId: "user-2",
      deviceId: "device-2",
    });
  });
});
