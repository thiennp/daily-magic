import {
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";

/** Body for `.cursor/rules/agent-witch-check-context.mdc` (alwaysApply). */
export const buildCursorProjectRuleContent = (projectId: string): string => {
  const body = [
    "On the first user message of a session, call the Agent Witch MCP tool",
    "`check_context` with this folder's cwd.",
    `projectId: ${projectId}`,
    "If status is miss or none (already declined), stay silent.",
    "If status is hit, follow the tip. Do not dump large context.",
  ].join("\n");
  return [
    "---",
    "description: Agent Witch check_context (token-saver)",
    "alwaysApply: true",
    "---",
    "",
    HTML_MARKER_BEGIN,
    body,
    HTML_MARKER_END,
    "",
  ].join("\n");
};
