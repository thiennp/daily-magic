import { AGENT_WITCH_DISPATCH_ERROR_CODES } from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { listFreshRegistryDeviceIdsForUser } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { enqueueAgentWitchDispatchOutbox } from "@/lib/agentWitch/enqueueAgentWitchDispatchOutbox";
import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { isQueueableAgentWitchDispatchMessageType } from "@/lib/agentWitch/isQueueableAgentWitchDispatchMessageType";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export type DeliverOrQueueAgentWitchDispatchResult =
  | { readonly kind: "delivered" }
  | { readonly kind: "queued"; readonly outboxId: string }
  | {
      readonly kind: "retry";
      readonly errorMessage: string;
      readonly errorCode: typeof AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING;
    }
  | {
      readonly kind: "offline";
      readonly errorMessage: string;
      readonly errorCode: typeof AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE;
    };

export const deliverOrQueueAgentWitchDispatchMessage = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly message: AgentWitchMessage;
  readonly idempotencyKey: string;
}): Promise<DeliverOrQueueAgentWitchDispatchResult> => {
  const hub = getAgentWitchHub();
  const agentClient = await findEnrichedAgentClientForUser(
    hub,
    input.userId,
    input.deviceId,
  );

  if (agentClient !== undefined) {
    agentClient.send(input.message);
    return { kind: "delivered" };
  }

  if (!isQueueableAgentWitchDispatchMessageType(input.message.type)) {
    const device = await findAgentWitchDeviceById(input.deviceId);
    const recentlySeen =
      device !== null &&
      isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now());

    if (recentlySeen) {
      return {
        kind: "retry",
        errorMessage:
          "The selected Mac is reconnecting. Try again in a few seconds.",
        errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
      };
    }

    return {
      kind: "offline",
      errorMessage: "The selected Mac is not online right now.",
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
    };
  }

  const registryDeviceIds = await listFreshRegistryDeviceIdsForUser(
    input.userId,
  );

  if (registryDeviceIds.has(input.deviceId)) {
    const { outboxId } = await enqueueAgentWitchDispatchOutbox({
      userId: input.userId,
      deviceId: input.deviceId,
      idempotencyKey: input.idempotencyKey,
      message: input.message,
    });
    return { kind: "queued", outboxId };
  }

  const device = await findAgentWitchDeviceById(input.deviceId);
  const recentlySeen =
    device !== null &&
    isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now());

  if (recentlySeen) {
    return {
      kind: "retry",
      errorMessage:
        "The selected Mac is reconnecting. Your task will send when it checks in.",
      errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_RECONNECTING,
    };
  }

  return {
    kind: "offline",
    errorMessage: "The selected Mac is not online right now.",
    errorCode: AGENT_WITCH_DISPATCH_ERROR_CODES.MAC_OFFLINE,
  };
};
