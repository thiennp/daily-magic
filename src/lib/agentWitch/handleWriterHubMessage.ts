import isClaudeRunPayload from "./isWriterRunPayload";
import isNonEmptyString from "./isNonEmptyString";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "./macOfflineForAccountErrorMessage.constant";
import { unauthorizedAgentOnlyError } from "./agentWitchHubClientOperations";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const handleClaudeRunMessage = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can dispatch Claude commands.",
      },
      requestId: message.requestId,
    };
  }

  if (!isClaudeRunPayload(message.payload)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "command.claude.run requires payload.prompt.",
      },
      requestId: message.requestId,
    };
  }

  const agentClient = runtime.findAgentClientForUser(sender.userId);

  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: MAC_OFFLINE_FOR_ACCOUNT_ERROR,
      },
      requestId: message.requestId,
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
    payload: {
      prompt: message.payload.prompt,
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      dispatched: true,
      agentClientId: agentClient.id,
    },
    requestId: message.requestId,
  };
};

export const handleClaudeResultMessage = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "agent") {
    return unauthorizedAgentOnlyError(message.requestId);
  }

  runtime.broadcastToDashboardUser(sender.userId, message);
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
