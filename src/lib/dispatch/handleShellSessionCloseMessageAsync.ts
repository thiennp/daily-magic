import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import {
  getShellSession,
  removeShellSession,
} from "@/lib/dispatch/shellSessionRegistry";

export const handleShellSessionCloseMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can close a Mac shell.",
      message.requestId,
    );
  }

  const shellSessionId =
    typeof message.payload?.shellSessionId === "string"
      ? message.payload.shellSessionId
      : "";
  const session = getShellSession(shellSessionId);
  if (session === undefined || session.ownerUserId !== sender.userId) {
    return buildDispatchError(
      "Shell session is not available for this dashboard client.",
      message.requestId,
    );
  }

  const agentClient = runtime.findAgentClientForUser(
    session.ownerUserId,
    session.deviceId ?? undefined,
  );
  if (agentClient !== undefined) {
    agentClient.send({
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSE,
      payload: { shellSessionId },
      requestId: message.requestId,
    });
  }

  removeShellSession(shellSessionId);
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { shellSessionId, closed: true },
    requestId: message.requestId,
  };
};
