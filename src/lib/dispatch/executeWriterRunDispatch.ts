import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { dispatchClaudeRunLive } from "@/lib/dispatch/dispatchClaudeRunLive";
import { executeApprovalGatedClaudeRunDispatch } from "@/lib/dispatch/executeApprovalGatedWriterRunDispatch";
import { isLocalMacAgentRunDispatch } from "@/lib/dispatch/isLocalMacAgentRunDispatch";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { queueClaudeRunFromExecuteDispatch } from "@/lib/dispatch/queueClaudeRunFromExecuteDispatch";
import { readWriterRunDispatchPayloadFields } from "@/lib/dispatch/readWriterRunDispatchPayloadFields";
import { resolveDelegatedWriterAgent } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { shouldRequireDispatchApproval } from "@/lib/dispatch/shouldRequireDispatchApproval";

export const executeClaudeRunDispatch = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient?: AgentWitchHubClient;
  readonly deviceId: string | null;
  readonly sender: AgentWitchHubClient;
  readonly prompt: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly executorUserId: string;
  readonly groupId: string | null;
  readonly dispatchPolicy: DispatchPolicyValue;
  readonly capabilityId: string | null;
  readonly capabilityVersionId: string | null;
  readonly requestId?: string;
}): Promise<AgentWitchMessage> => {
  const requesterUserId = input.sender.userId ?? "";
  const writerAgent = resolveDelegatedWriterAgent(input.payload);
  const requiresApproval = shouldRequireDispatchApproval({
    requesterUserId,
    executorUserId: input.executorUserId,
    dispatchPolicy: input.dispatchPolicy,
  });

  const run = await persistAgentRun({
    groupId: input.groupId,
    requesterUserId,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    prompt: input.prompt,
    status: requiresApproval
      ? AgentRunStatus.PENDING_APPROVAL
      : AgentRunStatus.RUNNING,
    dispatchPolicy: input.dispatchPolicy,
    writerAgent,
    capabilityId: input.capabilityId,
    capabilityVersionId: input.capabilityVersionId,
  });

  broadcastAgentRunRecord(input.runtime, run, input.requestId);

  if (requiresApproval) {
    return executeApprovalGatedClaudeRunDispatch(input, run, writerAgent);
  }

  const includeNextActions = isLocalMacAgentRunDispatch({
    requesterUserId,
    executorUserId: input.executorUserId,
    groupId: input.groupId,
  });
  const payloadFields = readWriterRunDispatchPayloadFields(input.payload);

  if (input.agentClient === undefined) {
    return queueClaudeRunFromExecuteDispatch({
      executorUserId: input.executorUserId,
      deviceId: input.deviceId,
      runId: run.id,
      prompt: input.prompt,
      writerAgent,
      requestId: input.requestId,
      requesterUserId,
      dispatchPolicy: input.dispatchPolicy,
      includeNextActions,
      ...payloadFields,
    });
  }

  return dispatchClaudeRunLive({
    runtime: input.runtime,
    agentClient: input.agentClient,
    sender: input.sender,
    prompt: input.prompt,
    runId: run.id,
    writerAgent,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    requesterUserId,
    dispatchPolicy: input.dispatchPolicy,
    includeNextActions,
    ...payloadFields,
    requestId: input.requestId,
  });
};
