import { handleAgentWitchSyncMessage } from "./handleAgentWitchSyncMessage";
import { routeAgentWitchMessageAsync } from "./routeAgentWitchMessageAsync";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const dispatchAgentWitchHubMessage = (
  runtime: AgentWitchHubRuntime,
  clients: Map<string, AgentWitchHubClient>,
  senderId: string,
  message: AgentWitchMessage,
): AgentWitchMessage | null => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
    return null;
  }

  return handleAgentWitchSyncMessage(
    runtime,
    senderId,
    message,
    clients.get(senderId),
  );
};

export const dispatchAgentWitchHubMessageAsync = (
  hub: AgentWitchHubRuntime,
  clients: Map<string, AgentWitchHubClient>,
  senderId: string,
  message: AgentWitchMessage,
): Promise<AgentWitchMessage | null> =>
  routeAgentWitchMessageAsync(hub, senderId, clients.get(senderId), message);
