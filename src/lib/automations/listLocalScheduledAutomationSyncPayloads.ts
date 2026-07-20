import { listAgentAutomationsForOwner } from "@/lib/automations/agentAutomationQueries";
import {
  buildLocalScheduledAutomationPayload,
  resolveAutomationLocalPrompt,
} from "@/lib/automations/buildLocalScheduledAutomationPayload";
import { AGENT_AUTOMATION_TRIGGER_TYPES } from "@/lib/automations/AgentAutomationTriggerType.constant";
import type LocalScheduledAutomationPayload from "@/lib/automations/types/LocalScheduledAutomationPayload.type";
import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";

export const listLocalScheduledAutomationSyncPayloads = async (
  ownerUserId: string,
): Promise<readonly LocalScheduledAutomationPayload[]> => {
  const automations = await listAgentAutomationsForOwner(ownerUserId);
  const scheduled = automations.filter(
    (automation) =>
      automation.triggerType === AGENT_AUTOMATION_TRIGGER_TYPES.SCHEDULE,
  );

  const payloads = await Promise.all(
    scheduled.map(async (automation) => {
      const capability = await getPublishedCapabilityById(
        automation.capabilityId,
      );

      if (capability === null || automation.schedulePreset === null) {
        return null;
      }

      const prompt = await resolveAutomationLocalPrompt(automation, capability);

      return buildLocalScheduledAutomationPayload(
        automation,
        capability,
        prompt,
      );
    }),
  );

  return payloads.flatMap((payload) => (payload !== null ? [payload] : []));
};
