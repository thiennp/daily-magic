import { describe, expect, it, vi } from "vitest";

import { deliverAgentWitchInstallBundleUpdateIfBehind } from "@/lib/agentWitch/deliverAgentWitchInstallBundleUpdateIfBehind";
import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

describe("deliverAgentWitchInstallBundleUpdateIfBehind", () => {
  it("AGENT-043: pushes install.bundle.update when the Mac bundle is behind cloud", () => {
    const send = vi.fn();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send,
    };

    const delivered = deliverAgentWitchInstallBundleUpdateIfBehind(
      sender,
      "36",
    );

    expect(delivered).toBe(true);
    expect(send).toHaveBeenCalledWith({
      type: AGENT_WITCH_MESSAGE_TYPES.INSTALL_BUNDLE_UPDATE,
      payload: {
        bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
        force: true,
        reason: "cloud-bundle-mismatch",
      },
    });
  });

  it("skips push when the Mac bundle already matches cloud", () => {
    const send = vi.fn();
    const sender: AgentWitchHubClient = {
      id: "agent-1",
      role: "agent",
      pairingToken: "pair-token",
      send,
    };

    const delivered = deliverAgentWitchInstallBundleUpdateIfBehind(
      sender,
      AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    );

    expect(delivered).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
});
