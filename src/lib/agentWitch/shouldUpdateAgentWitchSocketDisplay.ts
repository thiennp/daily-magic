import parseAgentWitchMessage from "@/lib/agentWitch/parseAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

const STREAM_DISPLAY_SKIP_TYPES = new Set<string>([
  AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_START,
  AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_ACCEPTED,
  AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_REJECTED,
  AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
  AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPEN,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPENED,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSE,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_CLOSED,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_SUBSCRIBE,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_INPUT,
  AGENT_WITCH_MESSAGE_TYPES.SHELL_RESIZE,
  AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
]);

const isShellOnlySystemAck = (
  payload: Readonly<Record<string, unknown>>,
): boolean =>
  typeof payload.shellSessionId === "string" &&
  (payload.opened === true || payload.dispatched === true);

/** Stream/shell traffic must not clobber the last user-facing ack/error. */
export const shouldUpdateAgentWitchSocketDisplay = (raw: string): boolean => {
  const message = parseAgentWitchMessage(raw);
  if (message === null) {
    return true;
  }
  if (STREAM_DISPLAY_SKIP_TYPES.has(message.type)) {
    return false;
  }
  if (
    message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK &&
    isShellOnlySystemAck(message.payload ?? {})
  ) {
    return false;
  }
  return true;
};
