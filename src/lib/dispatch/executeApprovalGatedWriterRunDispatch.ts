import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import type { DispatchPolicyValue } from "@/lib/dispatch/DispatchPolicy.constant";
import { sendPendingApprovalDispatch } from "@/lib/dispatch/sendPendingApprovalDispatch";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const executeApprovalGatedClaudeRunDispatch = (
  input: {
    readonly runtime: AgentWitchHubRuntime;
    readonly agentClient?: AgentWitchHubClient;
    readonly sender: AgentWitchHubClient;
    readonly prompt: string;
    readonly groupId: string | null;
    readonly dispatchPolicy: DispatchPolicyValue;
    readonly requestId?: string;
  },
  run: AgentRunRecord,
  writerAgent: HarnessWriterAgent,
): AgentWitchMessage => {
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
};
