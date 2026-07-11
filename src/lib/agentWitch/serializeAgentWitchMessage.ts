import type AgentWitchMessage from "./types/AgentWitchMessage.type";

const serializeAgentWitchMessage = (message: AgentWitchMessage): string =>
  JSON.stringify(message);

export default serializeAgentWitchMessage;
