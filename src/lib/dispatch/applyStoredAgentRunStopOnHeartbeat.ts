import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/**
 * S0-7 backstop: a stop stored by any instance (`stop_requested_at`) reaches
 * the computer on its next run.heartbeat — handled by the instance that owns
 * the computer's socket. Returns true when a stop was sent.
 */
export const applyStoredAgentRunStopOnHeartbeat = (input: {
  readonly sender: AgentWitchHubClient;
  readonly run: Pick<AgentRunRecord, "id" | "stopRequestedAt"> | null;
  readonly requestId?: string;
}): boolean => {
  if (input.run === null || !input.run.stopRequestedAt) {
    return false;
  }
  input.sender.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
    payload: { agentRunId: input.run.id },
    requestId: input.requestId,
  });
  return true;
};
