import { describe, expect, it, vi } from "vitest";

import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

vi.mock("@/lib/agentWitch/findAgentWitchDeviceByToken", () => ({
  findAgentWitchDeviceByToken: vi.fn(),
}));

import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { resolveOnlineClientsByDeviceId } from "@/lib/agentWitch/resolveOnlineClientsByDeviceId";

const agentClient = (
  overrides: Partial<AgentWitchHubClient> = {},
): AgentWitchHubClient => ({
  id: "agent-1",
  role: "agent",
  userId: "user-1",
  pairingToken: "pair-token",
  send: () => undefined,
  ...overrides,
});

describe("resolveOnlineClientsByDeviceId", () => {
  it("AGENT-002: maps live clients to devices via pairing token when device id is missing", async () => {
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

    const byDeviceId = await resolveOnlineClientsByDeviceId([
      agentClient({ deviceId: undefined }),
    ]);

    expect(byDeviceId.get("device-1")?.id).toBe("agent-1");
  });
});
