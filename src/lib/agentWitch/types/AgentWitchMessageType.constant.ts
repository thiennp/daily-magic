export const AGENT_WITCH_MESSAGE_TYPES = {
  AGENT_REGISTER: "agent.register",
  AGENT_HEARTBEAT: "agent.heartbeat",
  COMMAND_CLAUDE_RUN: "command.claude.run",
  COMMAND_CLAUDE_RESULT: "command.claude.result",
  HARNESS_REQUEST: "harness.request",
  HARNESS_REQUEST_ACK: "harness.request.ack",
  HARNESS_REQUEST_RESULT: "harness.request.result",
  HARNESS_MANIFEST_REPORT: "harness.manifest.report",
  AGENT_PAIR: "agent.pair",
  SYSTEM_ACK: "system.ack",
  SYSTEM_ERROR: "system.error",
} as const;

export type AgentWitchMessageType =
  (typeof AGENT_WITCH_MESSAGE_TYPES)[keyof typeof AGENT_WITCH_MESSAGE_TYPES];
