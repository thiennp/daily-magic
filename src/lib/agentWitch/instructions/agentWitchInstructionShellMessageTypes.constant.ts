import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchInstructionMessageType } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_SHELL_MESSAGE_TYPES: readonly AgentWitchInstructionMessageType[] =
  [
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_SESSION_OPEN,
      direction: "browser_to_mac",
      purpose: "Open an interactive Mac PTY shell session.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_DATA,
      direction: "mac_to_browser",
      purpose: "PTY output bytes for subscribed dashboards.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SHELL_INPUT,
      direction: "browser_to_mac",
      purpose: "Owner keystrokes into the Mac PTY (owner-only).",
    },
  ];
