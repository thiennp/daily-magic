import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const relayToAgent = (
  runtime: AgentWitchHubRuntime,
  executorUserId: string,
  message: AgentWitchMessage,
): AgentWitchMessage | null => {
  const agentClient = runtime.findAgentClientForUser(executorUserId);
  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "No paired local agent is connected for this account.",
      },
      requestId: message.requestId,
    };
  }

  agentClient.send(message);
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { relayed: true },
    requestId: message.requestId,
  };
};

export const handleDashboardAgentRunRelayAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can query local agent runs.",
      },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_LIST) {
    return relayToAgent(runtime, sender.userId, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_AGENT_RUN_LIST,
      payload: message.payload,
      requestId: message.requestId,
    });
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_GET) {
    return relayToAgent(runtime, sender.userId, {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_AGENT_RUN_GET,
      payload: message.payload,
      requestId: message.requestId,
    });
  }

  return null;
};

export const handleAgentAgentRunRelayResultAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "agent" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: { errorMessage: "Only paired agents can publish run results." },
      requestId: message.requestId,
    };
  }

  if (
    message.type ===
      AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_LIST_RESULT ||
    message.type === AGENT_WITCH_MESSAGE_TYPES.DASHBOARD_AGENT_RUN_GET_RESULT
  ) {
    runtime.broadcastToDashboardUser(sender.userId, message);
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: message.requestId,
    };
  }

  return null;
};
