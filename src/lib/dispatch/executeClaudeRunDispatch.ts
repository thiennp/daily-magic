import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { executeApprovalGatedClaudeRunDispatch } from "@/lib/dispatch/executeApprovalGatedClaudeRunDispatch";
import { isLocalMacAgentRunDispatch } from "@/lib/dispatch/isLocalMacAgentRunDispatch";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { resolveDelegatedWriterAgent } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { shouldRequireDispatchApproval } from "@/lib/dispatch/shouldRequireDispatchApproval";
import { startAgentRunWithShellSession } from "@/lib/dispatch/startAgentRunWithShellSession";

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

  if (input.agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: MAC_OFFLINE_FOR_ACCOUNT_ERROR,
        agentRunId: run.id,
      },
      requestId: input.requestId,
    };
  }

  const shellSessionId = await startAgentRunWithShellSession({
    runtime: input.runtime,
    agentClient: input.agentClient,
    sender: input.sender,
    prompt: input.prompt,
    runId: run.id,
    writerAgent,
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    includeNextActions: isLocalMacAgentRunDispatch({
      requesterUserId,
      executorUserId: input.executorUserId,
      groupId: input.groupId,
    }),
    sessionContinuation: input.payload.sessionContinuation === true,
    sourceRunId:
      typeof input.payload.sourceRunId === "string"
        ? input.payload.sourceRunId
        : undefined,
    requestId: input.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: run.id,
      agentClientId: input.agentClient.id,
      ...(shellSessionId !== undefined ? { shellSessionId } : {}),
      shellCanWrite: requesterUserId === input.executorUserId,
      dispatchPolicy: input.dispatchPolicy,
    },
    requestId: input.requestId,
  };
};
