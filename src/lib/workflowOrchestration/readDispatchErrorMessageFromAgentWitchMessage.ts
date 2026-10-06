import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { readDispatchErrorMessageWithHint } from "@/lib/dispatch/readDispatchErrorMessageWithHint";

const FALLBACK = "Dispatch failed.";

export const readDispatchErrorMessageFromAgentWitchMessage = (
  message: AgentWitchMessage,
): string =>
  message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR
    ? readDispatchErrorMessageWithHint(message, FALLBACK)
    : FALLBACK;

export default readDispatchErrorMessageFromAgentWitchMessage;
