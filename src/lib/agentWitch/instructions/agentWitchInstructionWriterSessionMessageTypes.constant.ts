import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchInstructionMessageType } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_WRITER_SESSION_MESSAGE_TYPES: readonly AgentWitchInstructionMessageType[] =
  [
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_END,
      direction: "browser_to_mac",
      purpose:
        "Browser tells the Mac agent to clear a persisted writer CLI session.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
      direction: "browser_to_mac",
      purpose:
        "Browser asks the Mac agent to prepare a writer CLI session without a task.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY,
      direction: "mac_to_browser",
      purpose: "Mac agent reports that a writer CLI session is ready.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
      direction: "mac_to_browser",
      purpose:
        "Mac agent streams writer session startup CLI output to the browser terminal mirror.",
    },
  ];
