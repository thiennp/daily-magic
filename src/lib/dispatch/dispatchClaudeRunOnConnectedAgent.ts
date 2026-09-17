import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { executeClaudeRunDispatch } from "@/lib/dispatch/executeWriterRunDispatch";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveDashboardDispatchProjectContext } from "@/lib/dispatch/resolveDashboardDispatchProjectContext";

export const dispatchClaudeRunOnConnectedAgent = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient: AgentWitchHubClient;
  readonly deviceId: string | null;
  readonly sender: AgentWitchHubClient;
  readonly body: AgentRunDispatchBody;
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly capabilityId: string | null;
  readonly capabilityVersionId: string | null;
  readonly requestId: string;
}): Promise<AgentWitchMessage> => {
  const projectContext = await resolveDashboardDispatchProjectContext({
    body: input.body,
    requesterUserId: input.requesterUserId,
    targetDeviceId: input.deviceId,
    requestId: input.requestId,
  });

  if (!projectContext.ok) {
    return projectContext.message;
  }

  return executeClaudeRunDispatch({
    runtime: input.runtime,
    agentClient: input.agentClient,
    deviceId: input.deviceId,
    sender: input.sender,
    prompt: projectContext.body.prompt,
    payload: projectContext.payload,
    executorUserId: input.executorUserId,
    groupId: input.groupId,
    dispatchPolicy: input.dispatchPolicy,
    capabilityId: input.capabilityId,
    capabilityVersionId: input.capabilityVersionId,
    requestId: input.requestId,
  });
};
