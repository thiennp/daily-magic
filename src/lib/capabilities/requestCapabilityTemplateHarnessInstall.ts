import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { sendHarnessInstallToAgentClient } from "@/lib/harness/sendHarnessInstallToAgentClient";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";

export interface TemplateHarnessInstallResult {
  readonly installed: boolean;
  readonly errorMessage: string | null;
}

const requestCapabilityTemplateHarnessInstall = (
  userId: string,
  harness: CapabilityTemplateHarness,
  deviceId?: string,
): TemplateHarnessInstallResult => {
  const hub = getAgentWitchHub();
  const agentClient = hub.findAgentClientForUser(userId, deviceId);

  if (agentClient === undefined) {
    return {
      installed: false,
      errorMessage: deviceId
        ? "The selected Mac is not online right now."
        : "Mac offline. Open Agent with Agent Witch running to install the rules bundle.",
    };
  }

  sendTemplateHarnessToAgent(agentClient, harness);

  return {
    installed: true,
    errorMessage: null,
  };
};

export const sendTemplateHarnessToAgent = (
  agentClient: AgentWitchHubClient,
  harness: CapabilityTemplateHarness,
): void => {
  const items: readonly HarnessItemWriteSpec[] = harness.items.map((item) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
    content: item.content,
    setSlugs: [harness.slug],
  }));

  sendHarnessInstallToAgentClient(agentClient, {
    name: harness.name,
    slug: harness.slug,
    items,
  });
};

export default requestCapabilityTemplateHarnessInstall;
