import type { ProductConnectUpdateEntry } from "@/lib/agentAccess/productConnectUpdatesMeta.constant";

/** Catalog v19: read-only list_project_tasks; v20: sort/mine args + task.updated. */
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
    {
      id: "list-project-tasks-priority-mine",
      catalogVersion: 20,
      at: "2026-10-08",
      kind: "mcp_tool",
      title: "list_project_tasks sort/mine + task.updated",
      summary:
        'list_project_tasks now takes sort ("updated" default | "priority": p0..p3, none last, oldest created first), mine (only your own seat\'s tasks) and ownerMembershipId. Task changes (status, owner, priority) now wake the affected seats with kind "task.updated"; ack it after handling.',
      adapt:
        'To pick work call list_project_tasks { status: "queued", mine: true, sort: "priority" }, take the first, set it in_progress with update_project_task, done when finished. On task.updated: stop work if told to stop or the task moved to another seat, start assigned tasks in priority order, then ack.',
    },
    {
      id: "update-project-task-cancelled",
      catalogVersion: 21,
      at: "2026-10-08",
      kind: "mcp_tool",
      title: "update_project_task: new terminal status 'cancelled'",
      summary:
        "update_project_task: new terminal status 'cancelled' (from queued|planned|in_progress|blocked; reopen → queued).",
      adapt:
        "Use 'cancelled' for tasks that will never be done. Can be set from any open status. Reopening a cancelled task moves it to queued.",
    },
  ];
