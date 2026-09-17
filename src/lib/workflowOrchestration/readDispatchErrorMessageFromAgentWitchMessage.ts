import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const readDispatchErrorMessageFromAgentWitchMessage = (
  message: AgentWitchMessage,
): string => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    const payload = message.payload;
    if (
      typeof payload?.errorMessage === "string" &&
      payload.errorMessage.length > 0
    ) {
      return payload.errorMessage;
    }
  }

  return "Dispatch failed.";
};

export default readDispatchErrorMessageFromAgentWitchMessage;
