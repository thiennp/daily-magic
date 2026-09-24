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
      "Create an Agent Witch account for this AI. No human email is required. Returns a bearer token once.",
    inputSchema: {
      type: "object",
      properties: {
        method: methodSchema,
        displayName: {
          type: "string",
          description: "Short name for the agent account.",
        },
      },
      required: ["method"],
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
    description: "List Macs paired to this account.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "send_task",
    description:
      "Send a Task to a paired Mac. The Mac must already be connected. Returns the Run id.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "What the Mac should do." },
        targetDeviceId: {
          type: "string",
          description: "Optional Mac id from list_macs.",
        },
      },
      required: ["prompt"],
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
