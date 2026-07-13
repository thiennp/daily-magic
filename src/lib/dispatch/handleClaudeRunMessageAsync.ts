import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { resolveCapabilityForDispatch } from "@/lib/capabilities/resolveCapabilityForDispatch";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { executeClaudeRunDispatch } from "@/lib/dispatch/executeClaudeRunDispatch";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import {
  resolveClaudeRunAgentClient,
  resolveTargetDeviceId,
} from "@/lib/dispatch/resolveClaudeRunAgentClient";
import {
  resolveClaudeDispatchTarget,
  validateClaudeDispatchPayload,
} from "@/lib/dispatch/resolveClaudeDispatchTarget";

export const handleClaudeRunMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can dispatch Claude commands.",
      message.requestId,
    );
  }

  const validatedPayload = validateClaudeDispatchPayload(
    message.payload,
    message.requestId,
  );
  if (!validatedPayload.ok) {
    return validatedPayload.error;
  }

  const target = await resolveClaudeDispatchTarget(
    sender,
    validatedPayload.payload,
  );
  if (!target.ok) {
    return target.error;
  }

  const capabilityId =
    typeof validatedPayload.payload.capabilityId === "string"
      ? validatedPayload.payload.capabilityId
      : undefined;
  const capabilityResolution = await resolveCapabilityForDispatch(
    sender.userId,
    target.executorUserId,
    capabilityId,
    target.groupId,
    message.requestId,
  );

  if (!capabilityResolution.ok) {
    return capabilityResolution.error;
  }

  const agentResolution = await resolveClaudeRunAgentClient({
    runtime,
    senderUserId: sender.userId,
    executorUserId: target.executorUserId,
    targetDeviceId: resolveTargetDeviceId(validatedPayload.payload),
    requestId: message.requestId,
  });

  if (!agentResolution.ok) {
    return agentResolution.error;
  }

  const dispatchPolicy = await resolveDispatchPolicyForExecutor({
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    capabilityPolicyOverride:
      capabilityResolution.capability?.dispatchPolicyOverride ?? null,
  });

  return executeClaudeRunDispatch({
    runtime,
    agentClient: agentResolution.agentClient,
    sender,
    prompt: validatedPayload.payload.prompt,
    payload: validatedPayload.payload,
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    dispatchPolicy,
    capabilityId: capabilityResolution.capability?.id ?? null,
    capabilityVersionId: capabilityResolution.capabilityVersionId,
    requestId: message.requestId,
  });
};
