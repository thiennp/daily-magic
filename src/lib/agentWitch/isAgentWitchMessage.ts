import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";

const MESSAGE_TYPES = new Set<string>(Object.values(AGENT_WITCH_MESSAGE_TYPES));

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isAgentWitchMessage = (value: unknown): value is AgentWitchMessage => {
  if (!isRecord(value)) {
    return false;
  }

  const messageType = value.type;
  if (typeof messageType !== "string" || !MESSAGE_TYPES.has(messageType)) {
    return false;
  }

  if (value.payload !== undefined && !isRecord(value.payload)) {
    return false;
  }

  if (value.requestId !== undefined && typeof value.requestId !== "string") {
    return false;
  }

  return true;
};

export default isAgentWitchMessage;
