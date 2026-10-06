import { AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE } from "@/lib/agentAccess/agentAccessLocalFirstCopy.constant";
import { REGISTER_ACCOUNT_TOOL } from "@/lib/agentAccess/registerAccountTool.constant";
import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";

export type { AgentAccessToolDefinition };

export const AGENT_ACCESS_TOOL_CATALOG: readonly AgentAccessToolDefinition[] = [
  REGISTER_ACCOUNT_TOOL,
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
    description: `Send a Task to a paired computer in a project (Reports). Requires project_id. The computer must already be connected. Returns the Run id. ${AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE}`,
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
