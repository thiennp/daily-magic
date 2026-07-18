import { handleHarnessManifestReportMessage } from "./handleHarnessManifestReportMessage";
import { handleHarnessBorrowExportMessage } from "./handleHarnessBorrowExportMessage";
import { handleHarnessExportResultMessage } from "./handleHarnessExportResultMessage";
import { handleHarnessManifestRequestMessage } from "./handleHarnessManifestRequestMessage";
import {
  handleHarnessAgentRelayMessage,
  handleHarnessRequestMessage,
} from "./handleHarnessHubMessage";
import { buildPendingAccountLinkAckPayload } from "./buildPendingAccountLinkAckPayload";
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
    const pendingAccountLink = buildPendingAccountLinkAckPayload(
      sender?.email,
      sender?.userId !== undefined,
    );

    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      payload: {
        clientId: senderId,
        role: sender?.role ?? "dashboard",
        userId: sender?.userId,
        ...(pendingAccountLink !== null ? { pendingAccountLink } : {}),
      },
      requestId: message.requestId,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT) {
    return null;
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

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REQUEST) {
    return handleHarnessManifestRequestMessage(runtime, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_BORROW_EXPORT) {
    return handleHarnessBorrowExportMessage(runtime, message, sender);
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.HARNESS_EXPORT_RESULT) {
    return handleHarnessExportResultMessage(runtime, message, sender);
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
