import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";
import { LIST_PROJECT_TASKS_TOOL } from "@/lib/agentAccess/listProjectTasksTool.constant";

const META_PROPERTIES = {
  title: { type: "string", description: "Short task title (≤120 chars)." },
  description: {
    type: "string",
    description:
      "Optional one-line description (≤200 chars). Meta only — no bodies/secrets.",
  },
  summary: {
    type: "string",
    description: "Alias of description (≤200 chars).",
  },
  ownerMembershipId: {
    type: "string",
    description:
      "Owner seat UUID (list_project_peers). Default: your own seat.",
  },
  priority: {
    type: "string",
    enum: ["p0", "p1", "p2", "p3"],
    description: "p0 Urgent · p1 High · p2 Normal · p3 Low.",
  },
  stage: { type: "string", enum: ["design", "en", "build", "ready", "live"] },
  tipSha: { type: "string", description: "Git tip SHA (7–40 hex)." },
  dependsOn: {
    type: "array",
    items: { type: "string" },
    description: "Task ids of this project this task waits on (≤10).",
  },
  planItemId: {
    type: "string",
    description:
      "Planned item (task id, same project) this task was started from.",
  },
} as const;

/** DF-024 / AWD-7: bot handoffs land as task records in the project Tasks tab. */
export const CREATE_PROJECT_TASK_TOOL: AgentAccessToolDefinition = {
  name: "create_project_task",
  description:
    "Create a task in the project Tasks tab (use this for handoffs instead of chat rows). Meta only: title ≤120 + optional description ≤200; no body/prompt — keep bodies local. status queued (default) or planned. Viewers cannot write. 300/hour; 500 tasks per project (task_cap_reached { limit, hint }). Returns task.id for update_project_task. Not send_task (that runs work on a computer).",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      ...META_PROPERTIES,
      status: { type: "string", enum: ["queued", "planned"] },
    },
    required: ["projectId", "title"],
    additionalProperties: false,
  },
};

export const UPDATE_PROJECT_TASK_TOOL: AgentAccessToolDefinition = {
  name: "update_project_task",
  description:
    "Update a project task (from create_project_task or list_project_tasks). Status moves: queued⇄planned → in_progress ⇄ blocked; in_progress → done. done is final (task_done), but retrying done with nothing else changed returns ok; other moves → invalid_transition. Send only fields to change; null clears optional fields; an unchanged edit is ok and writes nothing. dependsOn may not form a cycle (depends_on_cycle). A concurrent edit → update_conflict (re-read, retry). Owner, and assistants claimed by the project owner, may edit any task; others only tasks they created or own (not_task_owner).",
  inputSchema: {
    type: "object",
    properties: {
      projectId: { type: "string" },
      taskId: { type: "string" },
      status: {
        type: "string",
        enum: ["queued", "planned", "in_progress", "blocked", "done"],
      },
      ...META_PROPERTIES,
    },
    required: ["projectId", "taskId"],
    additionalProperties: false,
  },
};

export const AGENT_ACCESS_PROJECT_TASK_TOOLS: readonly AgentAccessToolDefinition[] =
  [CREATE_PROJECT_TASK_TOOL, UPDATE_PROJECT_TASK_TOOL, LIST_PROJECT_TASKS_TOOL];
