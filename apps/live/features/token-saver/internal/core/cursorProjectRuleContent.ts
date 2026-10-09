import { buildCheckContextGlobalInstructionLines } from "./agentWitchCheckContextInstruction.constant";
import { buildKnowledgeReportProjectInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";
import {
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";

/** Body for `.cursor/rules/agent-witch-check-context.mdc` (alwaysApply). */
export const buildCursorProjectRuleContent = (projectId: string): string => {
  const body = [
    ...buildCheckContextGlobalInstructionLines(),
    `projectId: ${projectId}`,
    "Do not dump large context on hit.",
    ...buildKnowledgeReportProjectInstructionLines(projectId),
  ].join("\n");
  return [
    "---",
    "description: AgentWitch check_context (token-saver)",
    "alwaysApply: true",
    "---",
    "",
    HTML_MARKER_BEGIN,
    body,
    HTML_MARKER_END,
    "",
  ].join("\n");
};
