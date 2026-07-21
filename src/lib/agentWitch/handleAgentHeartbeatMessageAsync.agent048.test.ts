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

describe("handleAgentHeartbeatMessageAsync AGENT-048", () => {
  it("builds hostname#macosUsername install label from heartbeat", async () => {
    const runtime = createAgentHeartbeatTestRuntime();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send: () => undefined,
    };

    await handleAgentHeartbeatMessageAsync(runtime, "agent-1", sender, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
      payload: { hostname: "L92KQX615Q", macOsUsername: "thiennguyen" },
      requestId: "req-2",
    });

    expect(runtime.pairingStore.touchLastSeen).toHaveBeenCalledWith(
      "pair-token",
      "L92KQX615Q#thiennguyen",
    );
    expect(runtime.updateClient).toHaveBeenCalledWith(
      "agent-1",
      expect.objectContaining({
        deviceLabel: "L92KQX615Q#thiennguyen",
      }),
    );
  });
});
