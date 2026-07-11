import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import type { AgentWitchHub } from "./agentWitchHub";
import { handleAgentPairMessageAsync } from "./handleAgentPairMessageAsync";
import { handleAgentWitchSyncMessage } from "./handleAgentWitchSyncMessage";
import { handleClaudeResultMessageAsync } from "@/lib/dispatch/handleClaudeResultMessageAsync";
import { handleClaudeRunMessageAsync } from "@/lib/dispatch/handleClaudeRunMessageAsync";
import { handleDispatchApprovalRespondAsync } from "@/lib/dispatch/handleDispatchApprovalRespond";

export const routeAgentWitchMessageAsync = async (
  hub: AgentWitchHub,
  senderId: string,
  sender: AgentWitchHubClient | undefined,
  message: AgentWitchMessage,
): Promise<AgentWitchMessage | null> => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
    return handleAgentPairMessageAsync(hub, senderId, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN) {
    return handleClaudeRunMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT) {
    return handleClaudeResultMessageAsync(hub, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESPOND) {
    return handleDispatchApprovalRespondAsync(hub, message, sender);
  }

  return handleAgentWitchSyncMessage(hub, senderId, message, sender);
};
