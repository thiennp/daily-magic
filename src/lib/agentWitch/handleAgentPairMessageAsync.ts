import isAgentPairPayload from "./isAgentPairPayload";
import isNonEmptyString from "./isNonEmptyString";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const handleAgentPairMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  senderId: string,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can pair local agents.",
      },
      requestId: message.requestId,
    };
  }

  if (!isAgentPairPayload(message.payload)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "agent.pair requires payload.pairingToken.",
      },
      requestId: message.requestId,
    };
  }

  const pairingToken = message.payload.pairingToken.trim();
  const claimResult = await runtime.pairingStore.claimPairing(
    pairingToken,
    sender.userId,
    sender.email ?? sender.userId,
  );

  if (!claimResult.success) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          claimResult.errorMessage ?? "Could not pair this local agent token.",
      },
      requestId: message.requestId,
    };
  }

  runtime.bindAgentClientsToPairing(pairingToken);

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: {
      paired: true,
      pairingToken,
      deviceId: claimResult.claimedPairing?.deviceId,
    },
    requestId: message.requestId,
  };
};
