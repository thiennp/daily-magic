import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type { AgentWitchInstructionMessageType } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_MESSAGE_TYPES: readonly AgentWitchInstructionMessageType[] =
  [
    {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_REGISTER,
      direction: "mac_to_browser",
      purpose: "Mac agent announces itself after WebSocket connect.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_HEARTBEAT,
      direction: "mac_to_browser",
      purpose: "Keep-alive and presence for dashboards and dispatch routing.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR,
      direction: "browser_to_mac",
      purpose: "Browser claims a pairing token for the signed-in user.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RUN,
      direction: "browser_to_mac",
      purpose:
        "Dispatch a task to the Mac writer CLI with prompt and metadata.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_RESULT,
      direction: "mac_to_browser",
      purpose: "Final writer result for a run.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_REQUIRED,
      direction: "mac_to_browser",
      purpose: "Writer needs user input to continue.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_INPUT_RESPOND,
      direction: "browser_to_mac",
      purpose: "Browser forwards the user's answer to the Mac agent.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_REQUIRED,
      direction: "mac_to_browser",
      purpose: "Notify that a teammate dispatch awaits Mac owner approval.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESPOND,
      direction: "browser_to_mac",
      purpose: "Mac owner approves or declines a pending dispatch.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_CHUNK,
      direction: "mac_to_browser",
      purpose: "Live terminal output while a writer runs.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.TERMINAL_STREAM_END,
      direction: "mac_to_browser",
      purpose: "Terminal stream finished for the active run.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_REQUEST,
      direction: "browser_to_mac",
      purpose:
        "Ask the Mac agent to create harness sets or write items locally.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_MANIFEST_REPORT,
      direction: "mac_to_browser",
      purpose: "Mac agent uploads its local harness manifest snapshot.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.HARNESS_BORROW_EXPORT,
      direction: "browser_to_mac",
      purpose: "Request import of a teammate's shared bundle to this Mac.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      direction: "mac_to_browser",
      purpose: "Persist run metadata and output for Job history.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ACK,
      direction: "mac_to_browser",
      purpose: "Acknowledge a handled request or report progress flags.",
    },
    {
      type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
      direction: "mac_to_browser",
      purpose: "Report a recoverable or fatal handling error.",
    },
  ];
