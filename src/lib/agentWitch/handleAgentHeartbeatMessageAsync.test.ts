import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/agentWitch/updateAgentWitchDeviceAuthFields", () => ({
  updateAgentWitchDeviceWakeError: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion", () => ({
  updateAgentWitchDeviceInstallBundleVersion: vi
    .fn()
    .mockResolvedValue(undefined),
}));

vi.mock("@/lib/agentWitch/deliverAgentWitchDeviceRestart", () => ({
  deliverAgentWitchDeviceRestartIfRequested: vi.fn().mockResolvedValue(false),
}));

vi.mock(
  "@/lib/agentWitch/deliverAgentWitchInstallBundleUpdateIfBehind",
  () => ({
    deliverAgentWitchInstallBundleUpdateIfBehind: vi
      .fn()
      .mockReturnValue(false),
  }),
);

vi.mock("@/lib/agentWitch/runAgentWitchHeartbeatDeviceMaintenance", () => ({
  runAgentWitchHeartbeatDeviceMaintenance: vi.fn().mockResolvedValue(undefined),
}));

import { handleAgentHeartbeatMessageAsync } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync";
import { createAgentHeartbeatTestRuntime } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync.testHelper";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("handleAgentHeartbeatMessageAsync", () => {
  it("updates last seen and client heartbeat for paired agents", async () => {
    const runtime = createAgentHeartbeatTestRuntime();
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
    expect(response?.type).toBe(AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK);
    expect(response?.requestId).toBe("req-1");
    expect(response?.payload).toEqual(
      expect.objectContaining({
        installBundleVersion: expect.any(String),
      }),
    );
  });

  it("rejects heartbeats from non-agent clients", async () => {
    const runtime = createAgentHeartbeatTestRuntime();

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
