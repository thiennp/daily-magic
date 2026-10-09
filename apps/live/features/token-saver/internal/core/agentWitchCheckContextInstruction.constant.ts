/** Shared check_context reminder for Codex / Claude global instruction files. */
export const buildCheckContextGlobalInstructionLines =
  (): readonly string[] => [
    "On the first user message of a session, call the AgentWitch MCP tool",
    "`check_context` with the current cwd.",
    "If status is miss or none (declined), stay silent. If hit, follow the tip.",
  ];
