import isNonEmptyString from "@/lib/agentWitch/isNonEmptyString";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { getShellSession } from "@/lib/dispatch/shellSessionRegistry";

const forwardOwnerShellControl = (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient,
  type:
    | typeof AGENT_WITCH_MESSAGE_TYPES.SHELL_INPUT
    | typeof AGENT_WITCH_MESSAGE_TYPES.SHELL_RESIZE,
): AgentWitchMessage => {
  const shellSessionId =
    typeof message.payload?.shellSessionId === "string"
      ? message.payload.shellSessionId
      : "";
  const session = getShellSession(shellSessionId);
  if (session === undefined) {
    return buildDispatchError(
      "This shell session is no longer available. Reconnect or send the task again.",
      message.requestId,
    );
  }
  if (session.ownerUserId !== sender.userId) {
    return buildDispatchError(
      "Only the Mac owner can control this shell.",
      message.requestId,
    );
  }

  const agentClient = runtime.findAgentClientForUser(
    session.ownerUserId,
    session.deviceId ?? undefined,
  );
  if (agentClient === undefined) {
    return buildDispatchError(
      "The Mac for this shell is not online right now.",
      message.requestId,
    );
  }

  agentClient.send({
    type,
    payload: message.payload,
    requestId: message.requestId,
  });

  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    payload: { shellSessionId, forwarded: true },
    requestId: message.requestId,
  };
};

export const handleShellInputMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can type into a Mac shell.",
      message.requestId,
    );
  }
  const data =
    typeof message.payload?.data === "string" ? message.payload.data : "";
  if (data.length === 0) {
    return buildDispatchError(
      "shell.input requires payload.data.",
      message.requestId,
    );
  }
  return forwardOwnerShellControl(
    runtime,
    message,
    sender,
    AGENT_WITCH_MESSAGE_TYPES.SHELL_INPUT,
  );
};

export const handleShellResizeMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  if (sender?.role !== "dashboard" || !isNonEmptyString(sender.userId)) {
    return buildDispatchError(
      "Only authenticated dashboard clients can resize a Mac shell.",
      message.requestId,
    );
  }
  return forwardOwnerShellControl(
    runtime,
    message,
    sender,
    AGENT_WITCH_MESSAGE_TYPES.SHELL_RESIZE,
  );
};
