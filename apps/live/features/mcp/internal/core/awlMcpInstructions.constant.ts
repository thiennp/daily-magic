/**
 * MCP `initialize` → `instructions` for the AWL local server (only check_context
 * is served here; skills and runs live on the cloud agent-access MCP).
 */
export const AWL_MCP_INSTRUCTIONS = [
  "Local-first: on the first user message, call check_context with the session cwd. On hit, follow the tip. On miss or none, stay silent.",
  "Before you ask a model, also check this project's skills and earlier runs (AgentWitch cloud tools list_project_skills, get_project_skill, list_runs), then run the prompt through the Prompt Optimizer on this computer.",
].join("\n");
