import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v19: read-only list_project_tasks (Tasks tab meta over MCP). */
export const PRODUCT_CONNECT_UPDATES_PROJECT_TASKS: readonly ProductConnectUpdateEntry[] =
  [
    {
      id: "list-project-tasks",
      catalogVersion: 19,
      at: "2026-10-08",
      kind: "mcp_tool",
      title: "list_project_tasks",
      summary:
        "New read-only list_project_tasks { projectId, status?, limit?, cursor? } returns one project's task meta (id, title, description, status, priority, stage, owner seat, dependsOn, tipSha, timestamps), newest updated first, with nextCursor. Owner or active member only; never bodies.",
      adapt:
        "Call list_project_tasks to find open work and task ids before update_project_task instead of guessing or asking for ids in chat.",
    },
  ];
