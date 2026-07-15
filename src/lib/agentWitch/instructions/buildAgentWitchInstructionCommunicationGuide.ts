import type { AgentWitchInstructionCommunicationGuide } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";
import { AGENT_WITCH_INSTRUCTION_MESSAGE_TYPES } from "@/lib/agentWitch/instructions/agentWitchInstructionMessageTypes.constant";

export const buildAgentWitchInstructionCommunicationGuide = (
  websocketPath: string,
): AgentWitchInstructionCommunicationGuide => ({
  summary:
    "Browser and Mac communicate over a single WebSocket. JSON messages use a type field. The Mac agent registers, heartbeats, executes writer tasks, streams terminal output, and handles harness sync.",
  websocketPath,
  pairing: [
    "Install the Mac bridge and obtain a pairing token in local config.",
    "While signed in on the same Mac, the browser claims the pairing token so dispatches map to your account and devices.",
    "The Mac agent sends agent.register on connect and agent.heartbeat about every 30 seconds.",
  ],
  midRunInputMarker: "[[AWAITING_INPUT]]",
  messageTypes: AGENT_WITCH_INSTRUCTION_MESSAGE_TYPES,
});
