import "./resolveWriterRunAgentClient.test.mocks";

import { describe, expect, it, vi } from "vitest";

import { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { AgentWitchPairingStore } from "@/lib/agentWitch/agentWitchPairingStore";
import { resolveClaudeRunAgentClient } from "@/lib/dispatch/resolveWriterRunAgentClient";

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

  it("retargets to the sole live Mac when the requested device id is stale", async () => {
    vi.mocked(findAgentWitchDeviceByToken).mockResolvedValue({
      id: "device-live",
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
      targetDeviceId: "stale-device-row-id",
    });

    expect(result).toEqual({
      ok: true,
      agentClient: expect.objectContaining({ id: "agent-1" }),
      deviceId: "device-live",
    });
  });

  it("fails closed without queuing when the Mac is not on this hub (AGENT-022)", async () => {
    const hub = new AgentWitchHub(new AgentWitchPairingStore());

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
    expect(result.error.payload?.errorCode).toBe("mac_offline");
  });

  it("returns mac_reconnecting when the registry shows the Mac on another instance", async () => {
    const { isDeviceLiveOnAnotherInstance } =
      await import("@/lib/agentWitch/agentWitchConnectionRegistry");
    vi.mocked(isDeviceLiveOnAnotherInstance).mockResolvedValueOnce(true);

    const hub = new AgentWitchHub(new AgentWitchPairingStore());

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
    expect(result.error.payload?.errorCode).toBe("mac_reconnecting");
  });
});
