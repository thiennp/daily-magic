import type { AgentWitchInstructionCommunicationGuide } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";
import { AGENT_WITCH_INSTRUCTION_MESSAGE_TYPES } from "@/lib/agentWitch/instructions/agentWitchInstructionMessageTypes.constant";

export const buildAgentWitchInstructionCommunicationGuide = (
  websocketPath: string,
): AgentWitchInstructionCommunicationGuide => ({
  summary:
    "Browser and Mac stay connected while Agent Witch is running. The Mac registers on connect, checks in about every 30 seconds, runs tasks, streams output, and syncs rules.",
  websocketPath,
  pairing: [
    "Install Agent Witch on your Mac and complete setup from Home.",
    "While signed in on the same Mac, the browser links this computer to your account.",
    "The Mac checks in about every 30 seconds while Agent Witch is running.",
  ],
  midRunInputMarker: "[[AWAITING_INPUT]]",
  messageTypes: AGENT_WITCH_INSTRUCTION_MESSAGE_TYPES,
});
