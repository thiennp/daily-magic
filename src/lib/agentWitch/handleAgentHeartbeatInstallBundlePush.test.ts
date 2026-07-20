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

vi.mock("@/lib/agentWitch/deliverAgentWitchInstallBundleUpdateIfBehind", () => ({
  deliverAgentWitchInstallBundleUpdateIfBehind: vi.fn(),
}));

import { deliverAgentWitchInstallBundleUpdateIfBehind } from "@/lib/agentWitch/deliverAgentWitchInstallBundleUpdateIfBehind";
import { handleAgentHeartbeatMessageAsync } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync";
import { createAgentHeartbeatTestRuntime } from "@/lib/agentWitch/handleAgentHeartbeatMessageAsync.testHelper";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("handleAgentHeartbeatMessageAsync install bundle push (AGENT-043)", () => {
  it("asks the Mac to update when its bundle is behind cloud", async () => {
    const runtime = createAgentHeartbeatTestRuntime();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      deviceId: "device-1",
      send: vi.fn(),
    };

    await handleAgentHeartbeatMessageAsync(runtime, "agent-1", sender, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
      payload: { hostname: "Studio-Mac", installBundleVersion: "36" },
      requestId: "req-3",
    });

    expect(deliverAgentWitchInstallBundleUpdateIfBehind).toHaveBeenCalledWith(
      sender,
      "36",
    );
  });
});
