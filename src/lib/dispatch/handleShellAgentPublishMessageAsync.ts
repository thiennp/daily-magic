import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { broadcastShellToSubscribers } from "@/lib/dispatch/broadcastShellToSubscribers";
import { buildDispatchError } from "@/lib/dispatch/buildDispatchError";
import { requireShellOwnerAgent } from "@/lib/dispatch/requireShellOwnerAgent";
import { removeShellSession } from "@/lib/dispatch/shellSessionRegistry";
import { validateTerminalStreamChunkLimits } from "@/lib/dispatch/terminalStreamLimits";

const readShellSessionId = (
  payload: Record<string, unknown> | undefined,
): string =>
  typeof payload?.shellSessionId === "string" ? payload.shellSessionId : "";

export const handleShellSessionOpenedMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  const shellSessionId = readShellSessionId(message.payload);
  const auth = requireShellOwnerAgent(
    sender,
    shellSessionId,
    message.requestId,
  );
  if (!auth.ok) {
    return auth.error;
  }
  await broadcastShellToSubscribers(runtime, shellSessionId, {
    type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPENED,
    payload: { shellSessionId, mode: auth.session.mode },
  });
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};

export const handleShellSessionClosedMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  const shellSessionId = readShellSessionId(message.payload);
  const auth = requireShellOwnerAgent(
    sender,
    shellSessionId,
    message.requestId,
  );
  if (!auth.ok) {
    return auth.error;
  }
  await broadcastShellToSubscribers(runtime, shellSessionId, {
    type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSED,
    payload: { shellSessionId },
  });
  removeShellSession(shellSessionId);
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};

export const handleShellDataMessageAsync = async (
  runtime: AgentWitchHubRuntime,
  message: AgentWitchMessage,
  sender: AgentWitchHubClient | undefined,
): Promise<AgentWitchMessage | null> => {
  const shellSessionId = readShellSessionId(message.payload);
  const chunk =
    typeof message.payload?.chunk === "string" ? message.payload.chunk : "";
  const auth = requireShellOwnerAgent(
    sender,
    shellSessionId,
    message.requestId,
  );
  if (!auth.ok) {
    return auth.error;
  }
  if (chunk.length === 0) {
    return {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      requestId: message.requestId,
    };
  }
  const limitResult = validateTerminalStreamChunkLimits(shellSessionId, chunk);
  if (!limitResult.ok) {
    return buildDispatchError(limitResult.errorMessage, message.requestId);
  }
  await broadcastShellToSubscribers(runtime, shellSessionId, {
    type: AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA,
    payload: { shellSessionId, chunk },
  });
  return {
    type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
    requestId: message.requestId,
  };
};
