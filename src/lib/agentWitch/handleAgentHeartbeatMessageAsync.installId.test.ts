import { describe, expect, it, vi } from "vitest";

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

vi.mock("@/lib/agentWitch/runAgentWitchHeartbeatRegistrySync", () => ({
  runAgentWitchHeartbeatRegistrySync: vi.fn().mockResolvedValue(undefined),
}));

import { handleAgentHeartbeatMessageAsync } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync";
import { createAgentHeartbeatTestRuntime } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync.testHelper";
import { runAgentWitchHeartbeatDeviceMaintenance } from "@/lib/agentWitch/runAgentWitchHeartbeatDeviceMaintenance";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("handleAgentHeartbeatMessageAsync install id (61e9c49e)", () => {
  it("passes the host's install id to device maintenance", async () => {
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send: () => undefined,
    };

    await handleAgentHeartbeatMessageAsync(
      createAgentHeartbeatTestRuntime(),
      "agent-1",
      sender,
      {
        type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
        payload: {
          hostname: "box",
          macOsUsername: "box",
          installId: "0123456789abcdef",
        },
        requestId: "req-1",
      },
    );

    expect(runAgentWitchHeartbeatDeviceMaintenance).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceId: "device-1",
        installDeviceLabel: "box#box",
        installId: "0123456789abcdef",
      }),
    );
  });
});
