/**
 * "Check this project first" — Product final EN (docs/design/
 * local-first-join-step-EN.md, 2026-10-06 13:39, Safety first; Lead GO 13:29).
 * Verbatim, identical for every join type. SINGLE SOURCE: the join prompts,
 * /join, llms.txt, /for-agents and NRG AgentWitch import these named exports.
 * Only the Safety rules step is conditional ("if you have").
 */
export const PROJECT_LOCAL_FIRST_STEP = {
  title: "Check this project first",
  lead: "Before you answer from your own knowledge, check what this project already has.",
  steps: [
    "1. Safety rules: if you have the AgentWitch Local connector, call check_context.",
    "2. Library: call list_project_skills, then get_project_skill for any skill that fits the task.",
    "3. Past work: call list_runs to see your account's earlier Reports.",
    "4. Before you call send_task, run the Prompt optimizer.",
  ],
} as const;

/** Single-line variant (only where one line is needed). */
export const PROJECT_LOCAL_FIRST_ONE_LINE =
  "Check this project first: call check_context if you have the AgentWitch Local connector, read its Library (list_project_skills, get_project_skill), call list_runs for your account's earlier Reports, and run the Prompt optimizer before send_task.";

/** Guideline section (`/for-agents`, llms.txt): heading + the 4 numbered lines. */
export const AGENT_ACCESS_LOCAL_FIRST_GUIDELINE_SECTION = {
  heading: PROJECT_LOCAL_FIRST_STEP.title,
  body: PROJECT_LOCAL_FIRST_STEP.steps,
} as const;
