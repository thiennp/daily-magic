import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { resolveCapabilityForDispatch } from "@/lib/capabilities/resolveCapabilityForDispatch";
import { dispatchClaudeRunOnConnectedAgent } from "@/lib/dispatch/dispatchClaudeRunOnConnectedAgent";
import { finalizeDashboardDispatchResult } from "@/lib/dispatch/finalizeDashboardDispatchResult";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveDispatchPolicyForExecutor } from "@/lib/dispatch/resolveDispatchPolicyForExecutor";
import { resolveClaudeRunAgentClient } from "@/lib/dispatch/resolveWriterRunAgentClient";
import { resolveClaudeDispatchTarget } from "@/lib/dispatch/resolveWriterDispatchTarget";
import { resolveWriterDispatchWithoutLiveHubClient } from "@/lib/dispatch/resolveWriterDispatchWithoutLiveHubClient";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/types/DispatchClaudeRunForDashboardResult.type";

export const dispatchClaudeRunForDashboardUserMac = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly sender: AgentWitchHubClient;
  readonly body: AgentRunDispatchBody;
  readonly requesterUserId: string;
  readonly requestId: string;
  readonly allowHubRelay: boolean;
  readonly payload: Readonly<Record<string, unknown>> & {
    readonly prompt: string;
  };
  readonly targetDeviceId?: string;
}): Promise<DispatchClaudeRunForDashboardResult> => {
  const target = await resolveClaudeDispatchTarget(input.sender, input.payload);
  if (!target.ok) {
    return { ok: false, message: target.error };
  }

  const capabilityResolution = await resolveCapabilityForDispatch(
    input.requesterUserId,
    target.executorUserId,
    input.body.capabilityId ?? undefined,
    target.groupId,
    input.requestId,
  );

  if (!capabilityResolution.ok) {
    return { ok: false, message: capabilityResolution.error };
  }

  const agentResolution = await resolveClaudeRunAgentClient({
    runtime: input.runtime,
    senderUserId: input.requesterUserId,
    executorUserId: target.executorUserId,
    targetDeviceId: input.targetDeviceId,
    requestId: input.requestId,
  });

  if (!agentResolution.ok) {
    return { ok: false, message: agentResolution.error };
  }

  if (agentResolution.agentClient === undefined) {
    return resolveWriterDispatchWithoutLiveHubClient({
      allowHubRelay: input.allowHubRelay,
      agentResolution,
      executorUserId: target.executorUserId,
      requesterUserId: input.requesterUserId,
      requestId: input.requestId,
      body: input.body,
      fallbackDeviceId: input.targetDeviceId,
    });
  }

  const dispatchPolicy = await resolveDispatchPolicyForExecutor({
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    capabilityPolicyOverride:
      capabilityResolution.capability?.dispatchPolicyOverride ?? null,
  });

  const message = await dispatchClaudeRunOnConnectedAgent({
    runtime: input.runtime,
    agentClient: agentResolution.agentClient,
    deviceId: agentResolution.deviceId,
    sender: input.sender,
    body: input.body,
    requesterUserId: input.requesterUserId,
    executorUserId: target.executorUserId,
    groupId: target.groupId,
    dispatchPolicy,
    capabilityId: capabilityResolution.capability?.id ?? null,
    capabilityVersionId: capabilityResolution.capabilityVersionId,
    requestId: input.requestId,
  });

  return finalizeDashboardDispatchResult(message, input.requestId);
};
