import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_ACTIVITY_TOOL: AgentAccessToolDefinition = {
  name: "list_project_activity",
  description:
    "Owner only: the project's Access log (invites, approvals, denials, removals, leaves, human invites, auto-approve, how each assistant gets messages, and safety rule drop/restore). Newest first, structured fields only, no message content. Non-owners get code owner_only. Keeps the last 500 changes from the past 180 days.",
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
        description: "Optional opaque nextCursor from the previous page.",
      },
      category: {
        type: "string",
        enum: ["access", "wake", "safety"],
        description: "Optional filter: access (people and invites), wake (delivery mode), or safety (rule drop/restore).",
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
