import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";

/** Read-only Tasks tab list for one project (pairs with update_project_task). */
export const LIST_PROJECT_TASKS_TOOL: AgentAccessToolDefinition = {
  name: "list_project_tasks",
  description:
    "Read-only: list task meta of one project's Tasks tab (id, title, description, status, priority, stage, owner seat, dependsOn, tipSha, timestamps). Never bodies. Default order: newest updated first; sort=priority gives p0..p3 then unprioritized, oldest created first. To pick work: status=queued, mine=true, sort=priority; take the first; set it in_progress with update_project_task. mine=true = only tasks owned by your own seat (a project owner without a seat gets an empty list). Use the returned id with update_project_task. Owner or active member only (pending/non-member → forbidden). Page with nextCursor.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      status: {
        type: "string",
        enum: [
          "queued",
          "planned",
          "in_progress",
          "blocked",
          "done",
          "cancelled",
        ],
        description: "Optional filter: only tasks in this status.",
      },
      sort: {
        type: "string",
        enum: ["updated", "priority"],
        description:
          "Optional order: updated (default, newest first) or priority (p0..p3, none last, oldest created first).",
      },
      mine: {
        type: "boolean",
        description:
          "Optional: only tasks owned by your own seat (empty if you have no seat).",
      },
      ownerMembershipId: {
        type: "string",
        description:
          "Optional: only tasks owned by this seat (overrides mine).",
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
