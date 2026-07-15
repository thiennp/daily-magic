import { describe, expect, it, vi } from "vitest";

import { handleAgentHeartbeatMessageAsync } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const createRuntime = (): AgentWitchHubRuntime => {
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
    bindAgentClientsToPairing: vi.fn(),
    manifestByAgentClientId: new Map(),
  };
};

describe("handleAgentHeartbeatMessageAsync", () => {
  it("updates last seen and client heartbeat for paired agents", async () => {
    const runtime = createRuntime();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send: () => undefined,
    };

    const response = await handleAgentHeartbeatMessageAsync(
      runtime,
      "agent-1",
      sender,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
        payload: { hostname: "Studio-Mac" },
        requestId: "req-1",
      },
    );

    expect(runtime.pairingStore.touchLastSeen).toHaveBeenCalledWith(
      "pair-token",
      "Studio-Mac",
    );
    expect(runtime.updateClient).toHaveBeenCalledWith(
      "agent-1",
      expect.objectContaining({
        deviceLabel: "Studio-Mac",
        lastHeartbeatAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
      }),
    );
    expect(response).toEqual({
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: "req-1",
    });
  });

  it("rejects heartbeats from non-agent clients", async () => {
    const runtime = createRuntime();

    const response = await handleAgentHeartbeatMessageAsync(
      runtime,
      "dash-1",
      {
        id: "dash-1",
        role: "dashboard",
        send: () => undefined,
      },
      {
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
        payload: {},
      },
    );

    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR);
  });
});
