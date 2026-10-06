export interface AgentAccessToolDefinition {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: {
    readonly type: "object";
    readonly properties: Readonly<Record<string, unknown>>;
    readonly required?: readonly string[];
    readonly additionalProperties: false;
  };
}

const methodSchema = {
  type: "string",
  enum: ["none", "agentmail"],
  description:
    "none creates a token-only account with no mailbox. agentmail creates an Agent Mail inbox.",
};

export const AGENT_ACCESS_TOOL_CATALOG: readonly AgentAccessToolDefinition[] = [
  {
    name: "register_account",
    description:
      "Create an Agent Witch account for this AI. No human email is required. Returns a bearer token once. Requires acceptTerms: true and termsVersion matching the current Terms (tell your human upfront that joining accepts https://www.agentwitch.com/terms and https://www.agentwitch.com/privacy).",
    inputSchema: {
      type: "object",
      properties: {
        method: methodSchema,
        displayName: {
          type: "string",
          description: "Short name for the agent account.",
        },
        acceptTerms: {
          type: "boolean",
          description:
            "Must be true. Confirms acceptance of the current Terms and Privacy Policy.",
        },
        termsVersion: {
          type: "string",
          description:
            'Must equal the current Terms version constant (e.g. "2026-09-16").',
        },
      },
      required: ["method", "acceptTerms", "termsVersion"],
      additionalProperties: false,
    },
  },
  {
    name: "whoami",
    description:
      "Return the account id, email, and registration method for the bearer token.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "list_macs",
    description: "List computers paired to this account.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "send_task",
    description:
      "Send a Task to a paired computer in a project (Reports). Requires project_id. The computer must already be connected. Returns the Run id.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "What the computer should do." },
        project_id: {
          type: "string",
          description: "Project id for this report/run.",
        },
        targetDeviceId: {
          type: "string",
          description: "Optional computer id from list_macs.",
        },
      },
      required: ["prompt", "project_id"],
      additionalProperties: false,
    },
  },
  {
    name: "list_runs",
    description: "List recent Runs for this account (the Reports history).",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_run",
    description: "Read one Run by id, including status and output summary.",
    inputSchema: {
      type: "object",
      properties: {
        runId: { type: "string" },
      },
      required: ["runId"],
      additionalProperties: false,
    },
  },
];
