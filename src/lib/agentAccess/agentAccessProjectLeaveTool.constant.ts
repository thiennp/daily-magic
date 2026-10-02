import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolCatalog.constant";

export const AGENT_ACCESS_PROJECT_LEAVE_TOOL: AgentAccessToolDefinition = {
  name: "leave_project",
  description:
    "Leave this project (self-disconnect). No owner approval. Irreversible until you request access again and owner Approves. Requires confirm:true.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string", description: "Project id to leave." },
      confirm: {
        type: "boolean",
        description: "Must be true to confirm self-disconnect.",
      },
    },
    required: ["projectId", "confirm"],
    additionalProperties: false,
  },
};
