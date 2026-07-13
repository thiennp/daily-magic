import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { createEphemeralAgentRun } from "@/lib/dispatch/createEphemeralAgentRun";
import {
  dispatchClaudeRunToAgent,
  markAgentRunRunning,
} from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import { resolveCapabilityForDispatch } from "@/lib/capabilities/resolveCapabilityForDispatch";
import {
  resolveClaudeDispatchTarget,
  validateClaudeDispatchPayload,
} from "@/lib/dispatch/resolveClaudeDispatchTarget";
import { sendPendingApprovalDispatch } from "@/lib/dispatch/sendPendingApprovalDispatch";

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

  const agentClient = runtime.findAgentClientForUser(target.executorUserId);

  if (agentClient === undefined) {
    return buildDispatchError(
      target.executorUserId === sender.userId
        ? "No paired local agent is connected for your account."
        : "The target user has no paired local agent connected.",
      message.requestId,
    );
  }

  const dispatchPolicy = await resolveDispatchPolicyForExecutor({
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    capabilityPolicyOverride:
      capabilityResolution.capability?.dispatchPolicyOverride ?? null,
  });

  const run = createEphemeralAgentRun({
    groupId: target.groupId,
    requesterUserId: sender.userId,
    executorUserId: target.executorUserId,
    prompt: validatedPayload.payload.prompt,
    status:
      dispatchPolicy === DispatchPolicy.APPROVAL
        ? AgentRunStatus.PENDING_APPROVAL
        : AgentRunStatus.RUNNING,
    dispatchPolicy,
    capabilityId: capabilityResolution.capability?.id ?? null,
    capabilityVersionId: capabilityResolution.capabilityVersionId,
  });

  registerAgentRunSession(run);
  broadcastAgentRunRecord(runtime, run, message.requestId);

  if (dispatchPolicy === DispatchPolicy.APPROVAL) {
    return sendPendingApprovalDispatch(
      runtime,
      agentClient,
      sender,
      run,
      validatedPayload.payload.prompt,
      target.groupId,
      dispatchPolicy,
      message.requestId,
    );
  }

  dispatchClaudeRunToAgent(
    runtime,
    agentClient,
    validatedPayload.payload.prompt,
    run.id,
    message.requestId,
  );
  await markAgentRunRunning(runtime, run.id);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: run.id,
      agentClientId: agentClient.id,
      dispatchPolicy,
    },
    requestId: message.requestId,
  };
};
