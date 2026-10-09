import { buildKnowledgeReportGlobalInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";
import {
  HTML_MARKER_BEGIN,
  HTML_MARKER_END,
} from "./tokenSaverMarkers.constants";

/** Body for `~/.cursor/rules/agent-witch-knowledge-report.mdc` (alwaysApply). */
export const buildCursorGlobalKnowledgeRuleContent = (): string => {
  const body = buildKnowledgeReportGlobalInstructionLines().join("\n");
  return [
    "---",
    "description: AgentWitch project knowledge report (AWB loopback)",
    "alwaysApply: true",
    "---",
    "",
    HTML_MARKER_BEGIN,
    body,
    HTML_MARKER_END,
    "",
  ].join("\n");
};
