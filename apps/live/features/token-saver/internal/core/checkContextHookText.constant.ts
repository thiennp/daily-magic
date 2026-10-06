/**
 * Context injected by the Claude `UserPromptSubmit` hook when check_context
 * returns `none` + `promptCreate` (cwd is not an AgentWitch project yet).
 */
export const CHECK_CONTEXT_CREATE_PROMPT = [
  "AgentWitch · check_context: this folder is not an AgentWitch project yet.",
  "Ask the user once whether to add it in AgentWitch Local (Projects) so saved pitfalls show up here.",
  "If they decline or ignore it, do not ask again this session.",
].join("\n");
