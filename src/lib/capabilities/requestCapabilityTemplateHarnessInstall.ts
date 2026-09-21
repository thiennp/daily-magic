import {
  MAC_RECONNECTING_QUEUED_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { classifyAgentWitchDispatchUnavailability } from "@/lib/agentWitch/classifyAgentWitchDispatchUnavailability";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { sendHarnessInstallToAgentClient } from "@/lib/harness/sendHarnessInstallToAgentClient";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import { filterAgentHarnessItemsForInstall } from "@/lib/harness/partitionHarnessItemsByAudience";

export interface TemplateHarnessInstallResult {
  readonly installed: boolean;
  readonly errorMessage: string | null;
}

const buildTemplateHarnessInstallOfflineMessage = async (
  deviceId: string,
): Promise<string> =>
  (await classifyAgentWitchDispatchUnavailability(deviceId)) === "replaced"
    ? MAC_REPLACED_ERROR
    : MAC_RECONNECTING_QUEUED_ERROR;

const requestCapabilityTemplateHarnessInstall = async (
  userId: string,
  harness: CapabilityTemplateHarness,
  deviceId?: string,
): Promise<TemplateHarnessInstallResult> => {
  const resolved = await resolveDispatchTargetAgentClient({
    runtime: getAgentWitchHub(),
    userId,
    deviceId,
  });

  if (resolved === undefined) {
    return {
      installed: false,
      errorMessage: deviceId
        ? await buildTemplateHarnessInstallOfflineMessage(deviceId)
        : "Mac offline. Open Agent with Agent Witch running to install the rules bundle.",
    };
  }

  const targetDeviceId =
    resolved.deviceId ?? resolved.agentClient.deviceId ?? deviceId;
  if (targetDeviceId === undefined || targetDeviceId.length === 0) {
    return {
      installed: false,
      errorMessage: "Could not resolve a Mac device id for harness install.",
    };
  }

  await sendTemplateHarnessToAgent(
    resolved.agentClient,
    harness,
    userId,
    targetDeviceId,
  );

  return {
    installed: true,
    errorMessage: null,
  };
};

export const sendTemplateHarnessToAgent = async (
  agentClient: AgentWitchHubClient,
  harness: CapabilityTemplateHarness,
  userId: string,
  deviceId: string,
): Promise<void> => {
  const items: readonly HarnessItemWriteSpec[] =
    filterAgentHarnessItemsForInstall(harness.items).map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      content: item.content,
      setSlugs: [harness.slug],
    }));

  await sendHarnessInstallToAgentClient(
    agentClient,
    {
      name: harness.name,
      slug: harness.slug,
      items,
    },
    { userId, deviceId },
  );
};

export default requestCapabilityTemplateHarnessInstall;
