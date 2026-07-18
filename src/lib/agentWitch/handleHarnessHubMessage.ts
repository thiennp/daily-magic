import isHarnessRequestPayload from "./harness/isHarnessRequestPayload";
import isNonEmptyString from "./isNonEmptyString";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "./macOfflineForAccountErrorMessage.constant";
import { unauthorizedAgentOnlyError } from "./agentWitchHubClientOperations";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const handleHarnessRequestMessage = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can dispatch harness requests.",
      },
      requestId: message.requestId,
    };
  }

  if (!isHarnessRequestPayload(message.payload)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "harness.request requires writerAgent, spec, and instruction.",
      },
      requestId: message.requestId,
    };
  }

  const targetDeviceId =
    typeof message.payload?.targetDeviceId === "string" &&
    message.payload.targetDeviceId.length > 0
      ? message.payload.targetDeviceId
      : undefined;

  const agentClient = runtime.findAgentClientForUser(
    sender.userId,
    targetDeviceId,
  );

  if (agentClient === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          targetDeviceId !== undefined
            ? "The selected Mac is not online right now."
            : MAC_OFFLINE_FOR_ACCOUNT_ERROR,
      },
      requestId: message.requestId,
    };
  }

  agentClient.send({
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
    payload: {
      writerAgent: message.payload.writerAgent,
      spec: message.payload.spec,
      instruction: message.payload.instruction,
    },
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST_ACK,
    payload: {
      dispatched: true,
      agentClientId: agentClient.id,
      writerAgent: message.payload.writerAgent,
    },
    requestId: message.requestId,
  };
};

export const handleHarnessAgentRelayMessage = (
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
