import { deliverOrQueueAgentWitchDispatchMessage } from "@/lib/agentWitch/deliverOrQueueAgentWitchDispatchMessage";
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

  if (deviceId === undefined) {
    return {
      ok: false,
      errorMessage: "Mac offline. Open Agent Witch on your Mac and try again.",
    };
  }

  const result = await deliverOrQueueAgentWitchDispatchMessage({
    userId,
    deviceId,
    idempotencyKey: `automations-sync:${userId}:${deviceId}`,
    message: {
      type: AGENT_WITCH_MESSAGE_TYPES.AUTOMATIONS_SYNC,
      payload: { automations },
    },
  });

  if (result.kind === "delivered") {
    return { ok: true, writtenCount: automations.length };
  }

  if (result.kind === "queued") {
    return { ok: true, writtenCount: automations.length };
  }

  return { ok: false, errorMessage: result.errorMessage };
};

export const pushAutomationRunToUserMac = async (input: {
  readonly userId: string;
  readonly automationId: string;
  readonly deviceId?: string;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  if (input.deviceId === undefined) {
    return {
      ok: false,
      errorMessage: "Mac offline. Open Agent Witch on your Mac and try again.",
    };
  }

  const result = await deliverOrQueueAgentWitchDispatchMessage({
    userId: input.userId,
    deviceId: input.deviceId,
    idempotencyKey: `automations-run:${input.userId}:${input.deviceId}:${input.automationId}`,
    message: {
      type: AGENT_WITCH_MESSAGE_TYPES.AUTOMATIONS_RUN,
      payload: { automationId: input.automationId },
    },
  });

  if (result.kind === "delivered" || result.kind === "queued") {
    return { ok: true };
  }

  return { ok: false, errorMessage: result.errorMessage };
};
