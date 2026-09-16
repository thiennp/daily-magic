import { listFreshRegistryDeviceIdsForUser } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import {
  MAC_RECONNECTING_QUEUED_ERROR,
  MAC_RECONNECTING_RETRY_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import type { AgentWitchDispatchUnavailableResult } from "@/lib/agentWitch/buildAgentWitchDispatchUnavailableResult";
import { buildAgentWitchDispatchUnavailableResult } from "@/lib/agentWitch/buildAgentWitchDispatchUnavailableResult";
import { enqueueAgentWitchDispatchOutbox } from "@/lib/agentWitch/enqueueAgentWitchDispatchOutbox";
import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { isQueueableAgentWitchDispatchMessageType } from "@/lib/agentWitch/isQueueableAgentWitchDispatchMessageType";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

export type DeliverOrQueueAgentWitchDispatchResult =
  | { readonly kind: "delivered" }
  | { readonly kind: "queued"; readonly outboxId: string }
  | AgentWitchDispatchUnavailableResult;

export const deliverOrQueueAgentWitchDispatchMessage = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly message: AgentWitchMessage;
  readonly idempotencyKey: string;
}): Promise<DeliverOrQueueAgentWitchDispatchResult> => {
  const resolved = await resolveDispatchTargetAgentClient({
    runtime: getAgentWitchHub(),
    userId: input.userId,
    deviceId: input.deviceId,
  });

  if (resolved !== undefined) {
    resolved.agentClient.send(input.message);
    return { kind: "delivered" };
  }

  if (!isQueueableAgentWitchDispatchMessageType(input.message.type)) {
    return buildAgentWitchDispatchUnavailableResult({
      deviceId: input.deviceId,
      reconnectingMessage: MAC_RECONNECTING_RETRY_ERROR,
    });
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

  return buildAgentWitchDispatchUnavailableResult({
    deviceId: input.deviceId,
    reconnectingMessage: MAC_RECONNECTING_QUEUED_ERROR,
  });
};
