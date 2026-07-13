import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const buildAgentRunRecordMessage = (
  run: AgentRunRecord,
  requestId?: string,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
  payload: { run },
  requestId,
});

export const broadcastAgentRunRecord = (
  runtime: AgentWitchHubRuntime,
  run: AgentRunRecord,
  requestId?: string,
): void => {
  const message = buildAgentRunRecordMessage(run, requestId);
  runtime.broadcastToDashboardUser(run.requesterUserId, message);
  if (run.executorUserId !== run.requesterUserId) {
    runtime.broadcastToDashboardUser(run.executorUserId, message);
  }
};
