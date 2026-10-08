import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";

/** Read-only Tasks tab list for one project (pairs with update_project_task). */
export const LIST_PROJECT_TASKS_TOOL: AgentAccessToolDefinition = {
  name: "list_project_tasks",
  description:
    "Read-only: list task meta of one project's Tasks tab (id, title, description, status, priority, stage, owner seat, dependsOn, tipSha, timestamps). Never bodies. Newest updated first. Use the returned id with update_project_task. Owner or active member only (pending/non-member → forbidden). Page with nextCursor.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      status: {
        type: "string",
        enum: ["queued", "planned", "in_progress", "blocked", "done"],
        description: "Optional filter: only tasks in this status.",
      },
      limit: {
        type: "number",
        description: "Optional page size (1–100, default 50).",
      },
      cursor: {
        type: "string",
        description: "Optional opaque nextCursor from the previous page.",
      },
    },
    required: ["projectId"],
    additionalProperties: false,
  },
};
