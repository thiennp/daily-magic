import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import {
  dispatchClaudeRunToAgent,
  markAgentRunRunning,
} from "@/lib/dispatch/dispatchClaudeRunToAgent";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { persistAgentRun } from "@/lib/dispatch/persistAgentRun";
import { resolveDelegatedWriterAgent } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { sendPendingApprovalDispatch } from "@/lib/dispatch/sendPendingApprovalDispatch";
import { isLocalMacAgentRunDispatch } from "@/lib/dispatch/isLocalMacAgentRunDispatch";
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
    if (input.agentClient === undefined) {
      return {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
        payload: {
          dispatched: false,
          pendingApproval: true,
          agentRunId: run.id,
          dispatchPolicy: input.dispatchPolicy,
        },
        requestId: input.requestId,
      };
    }

    return sendPendingApprovalDispatch(
      input.runtime,
      input.agentClient,
      input.sender,
      run,
      input.prompt,
      input.groupId,
      input.dispatchPolicy,
      writerAgent,
      input.requestId,
    );
  }

  const includeNextActions = isLocalMacAgentRunDispatch({
    requesterUserId,
    executorUserId: input.executorUserId,
    groupId: input.groupId,
  });

  if (input.agentClient !== undefined) {
    dispatchClaudeRunToAgent(
      input.runtime,
      input.agentClient,
      input.prompt,
      run.id,
      writerAgent,
      input.requestId,
      includeNextActions,
    );
    await markAgentRunRunning(input.runtime, run.id);
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: run.id,
      ...(input.agentClient !== undefined
        ? { agentClientId: input.agentClient.id }
        : {}),
      queuedForDevicePull: input.agentClient === undefined,
      dispatchPolicy: input.dispatchPolicy,
    },
    requestId: input.requestId,
  };
};
