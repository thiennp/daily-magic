import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_ACTIVITY_TOOL: AgentAccessToolDefinition = {
  name: "list_project_activity",
  description:
    "List allowlisted project membership/status activity (access request/approve/deny/revoke, folder refs, allow-claim and membership-check outcomes). Reverse-chrono. No content bodies.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      since: {
        type: "string",
        description: "Optional ISO timestamp lower bound (inclusive).",
      },
      cursor: {
        type: "string",
        description: "Optional opaque event id for the next older page.",
      },
      limit: {
        type: "number",
        description: "Optional page size (1–100, default 50).",
      },
    },
    required: ["projectId"],
    additionalProperties: false,
  },
};
