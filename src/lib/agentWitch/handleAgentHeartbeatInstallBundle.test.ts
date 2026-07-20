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

import { handleAgentHeartbeatMessageAsync } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync";
import { createAgentHeartbeatTestRuntime } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync.testHelper";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("handleAgentHeartbeatMessageAsync install bundle (AGENT-041)", () => {
  it("stores install bundle version reported by the Mac", async () => {
    const runtime = createAgentHeartbeatTestRuntime();
    const { updateAgentWitchDeviceInstallBundleVersion } =
      await import("@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion");
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      deviceId: "device-1",
      send: () => undefined,
    };

    await handleAgentHeartbeatMessageAsync(runtime, "agent-1", sender, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
      payload: { hostname: "Studio-Mac", installBundleVersion: "34" },
      requestId: "req-2",
    });

    expect(updateAgentWitchDeviceInstallBundleVersion).toHaveBeenCalledWith({
      deviceId: "device-1",
      installBundleVersion: "34",
    });
  });
});
