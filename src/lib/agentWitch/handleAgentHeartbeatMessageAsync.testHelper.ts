import { vi } from "vitest";

import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

export const createAgentHeartbeatTestRuntime = (): AgentWitchHubRuntime => {
  const pairingStore = {
    touchLastSeen: vi.fn().mockResolvedValue(undefined),
    resolveClaimedPairing: vi.fn().mockResolvedValue({
      userId: "user-1",
      email: "user@example.com",
      claimedAt: "2026-01-01T00:00:00.000Z",
      deviceId: "device-1",
    }),
  };

  return {
    pairingStore: pairingStore as never,
    updateClient: vi.fn(),
    findAgentClientForUser: vi.fn(),
    listOnlineAgentClientsForUser: vi.fn(),
    listAgentClients: vi.fn().mockReturnValue([]),
    broadcastToDashboardUser: vi.fn(),
    broadcastToSubscribedDashboardUser: vi.fn(),
    bindAgentClientsToPairing: vi.fn(),
    manifestByAgentClientId: new Map(),
  };
};
