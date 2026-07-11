import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export const buildDispatchError = (
  errorMessage: string,
  requestId?: string,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
  payload: { errorMessage },
  requestId,
});
