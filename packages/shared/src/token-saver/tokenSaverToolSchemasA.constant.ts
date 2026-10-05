const stringProp = (description: string) =>
  ({ type: "string" as const, description });

export const CHECK_CONTEXT_TOOL_SCHEMA = {
  name: "check_context" as const,
  description:
    "Match the current prompt against project pitfalls. Call on the first user message. Returns hit, miss, or none. Miss stays silent.",
  inputSchema: {
    type: "object" as const,
    properties: {
      cwd: stringProp("Absolute working directory for the current session."),
      message: stringProp("User prompt or task text to match."),
      sessionId: stringProp("Optional session id for first-message tracking."),
      projectId: stringProp("Optional project id when already known."),
    },
    additionalProperties: false as const,
  },
} as const;

export const GET_CONTEXT_TOOL_SCHEMA = {
  name: "get_context" as const,
  description:
    "Compact project briefing: id, folder, and feature flags. Not a full docs dump.",
  inputSchema: {
    type: "object" as const,
    properties: {
      cwd: stringProp("Absolute working directory."),
      projectId: stringProp("Optional project id when already known."),
    },
    additionalProperties: false as const,
  },
} as const;

export const GET_PITFALLS_TOOL_SCHEMA = {
  name: "get_pitfalls" as const,
  description: "List or search project pitfalls in a short bot-friendly form.",
  inputSchema: {
    type: "object" as const,
    properties: {
      projectId: stringProp("Project id."),
      q: stringProp("Optional search text."),
      limit: { type: "number" as const, description: "Max rows to return." },
    },
    additionalProperties: false as const,
  },
} as const;
