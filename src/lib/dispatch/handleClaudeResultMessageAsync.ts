import { unauthorizedAgentOnlyError } from "@/lib/agentWitch/agentWitchHubClientOperations";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { dispatchAgentRunInputRegistry } from "@/lib/dispatch/dispatchAgentRunInputRegistry";
import { markAgentRunCompleted } from "@/lib/dispatch/dispatchClaudeRunToAgent";

export const handleClaudeResultMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  runtime.broadcastToDashboardUser(sender.userId, message);

  const agentRunId =
    typeof message.payload?.agentRunId === "string"
      ? message.payload.agentRunId
      : null;
  const exitCode =
    typeof message.payload?.exitCode === "number"
      ? message.payload.exitCode
      : -1;
  const output =
    typeof message.payload?.output === "string" ? message.payload.output : "";

  if (agentRunId !== null) {
    dispatchAgentRunInputRegistry.remove(agentRunId);
    await markAgentRunCompleted(agentRunId, exitCode, output);
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
