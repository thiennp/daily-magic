import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { listLocalScheduledAutomationSyncPayloads } from "@/lib/automations/listLocalScheduledAutomationSyncPayloads";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const pushAutomationsSyncToUserMac = async (
  userId: string,
  deviceId?: string,
): Promise<{
  readonly ok: boolean;
  readonly writtenCount?: number;
  readonly errorMessage?: string;
}> => {
  const automations = await listLocalScheduledAutomationSyncPayloads(userId);
  const agentClient = await findEnrichedAgentClientForUser(
    getAgentWitchHub(),
    userId,
    deviceId,
  );

  if (agentClient === undefined) {
    return {
      ok: false,
      errorMessage: "Mac offline. Open Agent Witch on your Mac and try again.",
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.AUTOMATIONS_SYNC,
    payload: { automations },
  });

  return { ok: true, writtenCount: automations.length };
};

export const pushAutomationRunToUserMac = async (input: {
  readonly userId: string;
  readonly automationId: string;
  readonly deviceId?: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const agentClient = await findEnrichedAgentClientForUser(
    getAgentWitchHub(),
    input.userId,
    input.deviceId,
  );

  if (agentClient === undefined) {
    return {
      ok: false,
      errorMessage: "Mac offline. Open Agent Witch on your Mac and try again.",
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.AUTOMATIONS_RUN,
    payload: { automationId: input.automationId },
  });

  return { ok: true };
};
