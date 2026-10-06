import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/**
 * Local-first order (COMBINED-DESIGN Part C, C1), existing tools only:
 * Safety rules → Library → history → Prompt Optimizer → send_task / run_workflow.
 * The local task store and Ollama steps are not shipped yet, so they are not named here.
 */
export const AGENT_ACCESS_LOCAL_FIRST_STEPS = [
  `1. Safety rules: if ${AGENT_WITCH_PRODUCT_NAME} Local is connected, call check_context with the project folder (cwd) and follow a hit tip.`,
  "2. Library: list_project_skills, then get_project_skill for skills that match; use the bound playbooks from get_project_briefing.",
  "3. History: list_runs, then get_run, for earlier attempts at the same task.",
  "4. Prompt Optimizer: run your prompt through the Prompt Optimizer on this computer (get_agent_guide → promptSdlc).",
  "5. Then send_task or run_workflow.",
] as const;

export const AGENT_ACCESS_LOCAL_FIRST_INTRO =
  "Local-first: before you ask a model, or call send_task or run_workflow, use what this project already knows, in this order. On a miss or an error, go to the next step.";

/** MCP `initialize` → `instructions` for the cloud agent-access server. */
export const AGENT_ACCESS_MCP_INSTRUCTIONS = [
  AGENT_ACCESS_LOCAL_FIRST_INTRO,
  ...AGENT_ACCESS_LOCAL_FIRST_STEPS,
  "Full guide: get_agent_guide.",
].join("\n");

/** One "before" clause appended to send_task / run_workflow descriptions. */
export const AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE = `Before calling, go local-first: Safety rules (check_context on ${AGENT_WITCH_PRODUCT_NAME} Local), Library (list_project_skills / get_project_skill), history (list_runs), then the Prompt Optimizer.`;

/** Last line of get_project_briefing `briefingText`. */
export const PROJECT_BRIEFING_LOCAL_FIRST_LINE = `Before work: Safety rules (check_context on ${AGENT_WITCH_PRODUCT_NAME} Local), skills (list_project_skills / get_project_skill), earlier runs (list_runs), then the Prompt Optimizer.`;
