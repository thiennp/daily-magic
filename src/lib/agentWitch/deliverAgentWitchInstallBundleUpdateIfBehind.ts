import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { isAgentWitchInstallBundleVersionBehind } from "@/lib/agentWitch/isAgentWitchInstallBundleVersionBehind";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const deliverAgentWitchInstallBundleUpdateIfBehind = (
  sender: AgentWitchHubClient | undefined,
  localInstallBundleVersion: string | null,
): boolean => {
  if (sender === undefined || sender.role !== "agent") {
    return false;
  }

  if (
    !isAgentWitchInstallBundleVersionBehind(
      localInstallBundleVersion,
      AGENT_WITCH_INSTALL_BUNDLE_VERSION,
    )
  ) {
    return false;
  }

  sender.send({
    type: AGENT_WITCH_MESSAGE_TYPES.INSTALL_BUNDLE_UPDATE,
    payload: {
      bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      force: true,
      reason: "cloud-bundle-mismatch",
    },
  });

  return true;
};
