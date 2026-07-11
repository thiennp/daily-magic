import isAgentWitchMessage from "./isAgentWitchMessage";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";

const parseAgentWitchMessage = (raw: string): AgentWitchMessage | null => {
  if (raw.trim().length === 0) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isAgentWitchMessage(parsed)) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export default parseAgentWitchMessage;
