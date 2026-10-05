/**
 * Context injected by the Claude `UserPromptSubmit` hook when check_context
 * returns `none` + `promptCreate` (cwd is not an Agent Witch project yet).
 */
export const CHECK_CONTEXT_CREATE_PROMPT = [
  "Agent Witch · check_context: this folder is not an Agent Witch project yet.",
  "Ask the user once whether to add it in Agent Witch Local (Projects) so saved pitfalls show up here.",
  "If they decline or ignore it, do not ask again this session.",
].join("\n");
