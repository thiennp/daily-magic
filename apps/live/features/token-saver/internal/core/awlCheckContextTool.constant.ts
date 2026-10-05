/** Local AWL MCP tool: check_context (status hit|miss|none). */
export const AWL_CHECK_CONTEXT_TOOL = {
  name: "check_context",
  description:
    "Match the current prompt against the local pitfall registry. Call on the first user message. Returns status hit|miss|none; miss is silent (0 tokens).",
  inputSchema: {
    type: "object" as const,
    properties: {
      cwd: {
        type: "string",
        description: "Absolute working directory for the current session.",
      },
      message: {
        type: "string",
        description: "User prompt or task text to keyword-match.",
      },
      sessionId: {
        type: "string",
        description: "Optional CLI session id (first-message tracking).",
      },
      projectId: {
        type: "string",
        description: "Optional Agent Witch project id when already known.",
      },
    },
    additionalProperties: false as const,
  },
} as const;

export const AWL_MCP_TOOLS = [AWL_CHECK_CONTEXT_TOOL] as const;

export const AWL_MCP_SERVER_INFO = {
  name: "agent-witch",
  version: "1.0.0",
} as const;

export const AWL_MCP_PROTOCOL_VERSION = "2024-11-05";
