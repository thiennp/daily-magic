import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import { dispatchHarnessBorrowExportAsync } from "@/lib/agentWitch/dispatchHarnessBorrowExportAsync";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const isStringArray = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

export const handleHarnessBorrowExportMessage = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): AgentWitchMessage | null => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "Only authenticated dashboard clients can export borrowed harness sets.",
      },
      requestId: message.requestId,
    };
  }

  const ownerUserId =
    typeof message.payload?.ownerUserId === "string"
      ? message.payload.ownerUserId
      : "";
  const setSlugs = message.payload?.setSlugs;

  if (ownerUserId.length === 0 || !isStringArray(setSlugs)) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage:
          "harness.borrow.export requires payload.ownerUserId and payload.setSlugs.",
      },
      requestId: message.requestId,
    };
  }

  const ownerAgent = runtime.findAgentClientForUser(ownerUserId);
  if (ownerAgent === undefined) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      payload: {
        errorMessage: "Owner's Mac is not online to export files.",
      },
      requestId: message.requestId,
    };
  }

  void dispatchHarnessBorrowExportAsync({
    runtime,
    ownerAgent,
    borrowerUserId: sender.userId,
    ownerUserId,
    setSlugs,
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { exportRequested: true, ownerUserId },
    requestId: message.requestId,
  };
};
