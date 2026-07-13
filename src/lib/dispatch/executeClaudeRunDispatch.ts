import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { registerAgentRunSession } from "@/lib/dispatch/agentRunSessionRegistry";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { createEphemeralAgentRun } from "@/lib/dispatch/createEphemeralAgentRun";
import {
  dispatchClaudeRunToAgent,
  markAgentRunRunning,
} from "@/lib/dispatch/dispatchClaudeRunToAgent";
import { DispatchPolicy, type DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { resolveDelegatedWriterAgent } from "@/lib/dispatch/resolveDelegatedWriterAgent";
import { sendPendingApprovalDispatch } from "@/lib/dispatch/sendPendingApprovalDispatch";

export const executeClaudeRunDispatch = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly agentClient: AgentWitchHubClient;
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
  const run = createEphemeralAgentRun({
    groupId: input.groupId,
    requesterUserId: input.sender.userId ?? "",
    executorUserId: input.executorUserId,
    prompt: input.prompt,
    status:
      input.dispatchPolicy === DispatchPolicy.APPROVAL
        ? AgentRunStatus.PENDING_APPROVAL
        : AgentRunStatus.RUNNING,
    dispatchPolicy: input.dispatchPolicy,
    capabilityId: input.capabilityId,
    capabilityVersionId: input.capabilityVersionId,
  });

  registerAgentRunSession(run);
  broadcastAgentRunRecord(input.runtime, run, input.requestId);

  if (input.dispatchPolicy === DispatchPolicy.APPROVAL) {
    return sendPendingApprovalDispatch(
      input.runtime,
      input.agentClient,
      input.sender,
      run,
      input.prompt,
      input.groupId,
      input.dispatchPolicy,
      resolveDelegatedWriterAgent(input.payload),
      input.requestId,
    );
  }

  dispatchClaudeRunToAgent(
    input.runtime,
    input.agentClient,
    input.prompt,
    run.id,
    resolveDelegatedWriterAgent(input.payload),
    input.requestId,
  );
  await markAgentRunRunning(input.runtime, run.id);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentRunId: run.id,
      agentClientId: input.agentClient.id,
      dispatchPolicy: input.dispatchPolicy,
    },
    requestId: input.requestId,
  };
};
