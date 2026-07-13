export const AGENT_WITCH_MESSAGE_TYPES = {
  AGENT_REGISTER: "agent.register",
  AGENT_HEARTBEAT: "agent.heartbeat",
  COMMAND_CLAUDE_RUN: "command.claude.run",
  COMMAND_CLAUDE_RESULT: "command.claude.result",
  COMMAND_CLAUDE_INPUT_REQUIRED: "command.claude.input_required",
  COMMAND_CLAUDE_INPUT_RESPOND: "command.claude.input_respond",
  DISPATCH_APPROVAL_REQUIRED: "dispatch.approval.required",
  DISPATCH_APPROVAL_RESPOND: "dispatch.approval.respond",
  DISPATCH_APPROVAL_RESULT: "dispatch.approval.result",
  HARNESS_REQUEST: "harness.request",
  HARNESS_REQUEST_ACK: "harness.request.ack",
  HARNESS_REQUEST_RESULT: "harness.request.result",
  HARNESS_MANIFEST_REPORT: "harness.manifest.report",
  HARNESS_MANIFEST_REQUEST: "harness.manifest.request",
  HARNESS_BORROW_EXPORT: "harness.borrow.export",
  HARNESS_EXPORT_REQUEST: "harness.export.request",
  HARNESS_EXPORT_RESULT: "harness.export.result",
  AGENT_PAIR: "agent.pair",
  SYSTEM_ACK: "system.ack",
  SYSTEM_ERROR: "system.error",
} as const;

export type AgentWitchMessageType =
  (typeof AGENT_WITCH_MESSAGE_TYPES)[keyof typeof AGENT_WITCH_MESSAGE_TYPES];
