import type { AgentAccessToolDefinition } from "@/lib/agentAccess/agentAccessToolDefinition.type";

const STRING = { type: "string" } as const;

/** Task refinement: split a request, claim with a lease, release with an outcome, find skill blockers. */
export const SPLIT_PROJECT_TASK_TOOL: AgentAccessToolDefinition = {
  name: "split_project_task",
  description:
    "Split one request (parent task) into single-purpose subtasks, max 10 per call. Repeats are dropped; each subtask gets the closest published skill (skillId + skillParams) or none, a cheapest-first effortTier (script|low|medium|high), and the parent's owner. Set needsSkill true when a script skill should exist but does not: a bot owner then blocks on it until a skill is published. Returns created[] and duplicates[]. Parent status is derived from its subtasks.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: STRING,
      taskId: { type: "string", description: "Parent task id." },
      subtasks: {
        type: "array",
        maxItems: 10,
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "One line, ≤120 chars." },
            skillId: STRING,
            skillParams: { type: "object" },
            effortTier: {
              type: "string",
              enum: ["script", "low", "medium", "high"],
            },
            needsSkill: { type: "boolean" },
          },
          required: ["title"],
          additionalProperties: false,
        },
      },
    },
    required: ["projectId", "taskId", "subtasks"],
    additionalProperties: false,
  },
};

export const CLAIM_PROJECT_TASK_TOOL: AgentAccessToolDefinition = {
  name: "claim_project_task",
  description:
    "Take a task with a 5-minute lease and start it (in_progress). First claimer wins (already_claimed otherwise); an expired lease can be taken over. Returns fence (pass it to release_project_task), effortTier, skillId, skillParams and attempts. Call again to renew before the lease ends. Blocked, done and cancelled tasks cannot be claimed.",
  inputSchema: {
    type: "object",
    properties: { projectId: STRING, taskId: STRING },
    required: ["projectId", "taskId"],
    additionalProperties: false,
  },
};

export const RELEASE_PROJECT_TASK_TOOL: AgentAccessToolDefinition = {
  name: "release_project_task",
  description:
    "Give a claim back with the outcome. fence must match the claim (stale_claim otherwise). done: needs resultSummary and should carry verifySignal (exit_code|schema|checker); without one it is flagged unverified. failed: retries one effort tier up, handed to a person after 3 failures. blocked: needs blockedReason, blockedOn skill|user; counted, handed to a person after 3 blocks. released: back to the queue.",
  inputSchema: {
    type: "object",
    properties: {
      projectId: STRING,
      taskId: STRING,
      fence: { type: "integer" },
      outcome: {
        type: "string",
        enum: ["done", "failed", "blocked", "released"],
      },
      resultSummary: { type: "string", description: "One line, ≤200 chars." },
      verifySignal: {
        type: "string",
        enum: ["exit_code", "schema", "checker", "none"],
      },
      blockedReason: { type: "string", description: "One line, ≤200 chars." },
      blockedOn: { type: "string", enum: ["skill", "user"] },
    },
    required: ["projectId", "taskId", "fence", "outcome"],
    additionalProperties: false,
  },
};

export const LIST_PROJECT_TASK_BLOCKERS_TOOL: AgentAccessToolDefinition = {
  name: "list_project_task_blockers",
  description:
    "Tasks blocked waiting for a skill to be made. Check this first when you wake. For each, make the skill and publish_project_skill it: matching blocked tasks are unblocked automatically. Tasks waiting over 24h are handed to a person (handedToUser).",
  inputSchema: {
    type: "object",
    properties: { projectId: STRING },
    required: ["projectId"],
    additionalProperties: false,
  },
};

export const AGENT_ACCESS_PROJECT_TASK_REFINE_TOOLS: readonly AgentAccessToolDefinition[] =
  [
    SPLIT_PROJECT_TASK_TOOL,
    CLAIM_PROJECT_TASK_TOOL,
    RELEASE_PROJECT_TASK_TOOL,
    LIST_PROJECT_TASK_BLOCKERS_TOOL,
  ];
