import parseAgentWitchMessage from "@/lib/agentWitch/parseAgentWitchMessage";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";

export interface AgentWitchSocketDisplay {
  readonly text: string;
  readonly isError: boolean;
}

const readString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

const formatSystemAck = (
  payload: Readonly<Record<string, unknown>>,
): string => {
  const message = readString(payload.message);
  if (message !== null) {
    return message;
  }

  if (payload.dispatched === true) {
    return "Task sent to your Mac.";
  }

  if (payload.dispatched === false) {
    return "Task is waiting for approval.";
  }

  if (payload.relayed === true) {
    return "Request relayed to your Mac.";
  }

  return "Request accepted.";
};

const formatClaudeResult = (
  payload: Readonly<Record<string, unknown>>,
): string => {
  const output = readString(payload.output);
  if (output !== null) {
    return output;
  }

  const errorMessage = readString(payload.errorMessage);
  if (errorMessage !== null) {
    return errorMessage;
  }

  return "Task finished on your Mac.";
};

const parseAgentWitchSocketDisplay = (raw: string): AgentWitchSocketDisplay => {
  const message = parseAgentWitchMessage(raw);
  if (message === null) {
    return { text: raw, isError: false };
  }

  const payload = message.payload ?? {};

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR) {
    return {
      text: readString(payload.errorMessage) ?? "Something went wrong.",
      isError: true,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK) {
    return {
      text: formatSystemAck(payload),
      isError: false,
    };
  }

  if (message.type === AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT) {
    const errorMessage = readString(payload.errorMessage);
    return {
      text: formatClaudeResult(payload),
      isError: errorMessage !== null,
    };
  }

  return {
    text: JSON.stringify(message, null, 2),
    isError: false,
  };
};

export default parseAgentWitchSocketDisplay;
