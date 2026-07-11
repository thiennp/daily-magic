import { handleHarnessManifestReportMessage } from "./handleHarnessManifestReportMessage";
import {
  handleHarnessAgentRelayMessage,
  handleHarnessRequestMessage,
} from "./handleHarnessHubMessage";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const handleAgentWitchSyncMessage = (
  runtime: AgentWitchHubRuntime,
  senderId: string,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: {
        clientId: senderId,
        role: sender?.role ?? "dashboard",
        userId: sender?.userId,
      },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "agent.pair must be handled asynchronously.",
      },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST) {
    return handleHarnessRequestMessage(runtime, message, sender);
  }

  if (
    message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK ||
    message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_RESULT
  ) {
    return handleHarnessAgentRelayMessage(runtime, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REPORT) {
    return handleHarnessManifestReportMessage(
      runtime,
      senderId,
      message,
      sender,
    );
  }

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
    payload: {
      errorMessage: `Unsupported message type: ${message.type}`,
    },
    requestId: message.requestId,
  };
};
