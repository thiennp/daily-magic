import {
  PROJECT_BOT_KNOWLEDGE_CARD_FORMAT_LINE,
  PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE,
  PROJECT_BOT_KNOWLEDGE_CARD_TASK_PAIR_LINE,
} from "@/lib/agentAccess/projectBotKnowledgeCardReport.constant";

/**
 * Join step 10 — report work so it becomes reusable skills. Invited project
 * only. With a local folder: persist a folder-scoped rule in the bot's own
 * instruction store. Without one: report directly to AgentWitch. Copy only.
 */
export const buildProjectInviteJoinReportSkillsStep = (input: {
  readonly projectIdHint: string;
}): readonly string[] => [
  "10. Report your work as knowledge cards so the project can build auto skills (this project only, the one you were invited to join):",
  `   Always use projectId ${input.projectIdHint}. Before starting, call list_project_skills and get_project_skill for any card/skill that fits and reuse it instead of re-deriving the work, to save tokens.`,
  `   ${PROJECT_BOT_KNOWLEDGE_CARD_FORMAT_LINE}`,
  `   ${PROJECT_BOT_KNOWLEDGE_CARD_ON_JOIN_LINE}`,
  `   While working: set the task in_progress; ${PROJECT_BOT_KNOWLEDGE_CARD_TASK_PAIR_LINE}`,
  "   If you work on a local computer folder for this project (see the folder refs in get_project_briefing): once, right after you join, save the rule above, scoped to that folder path and this projectId, in your own persistent instructions — global Cursor rules (~/.cursor/rules), Codex (~/.codex/AGENTS.md), Claude (~/.claude/CLAUDE.md), or your tool's equivalent — so every session in that folder follows it. Keep the full report on your computer. Tell your user in one line where you saved it. Do not add it to other projects or to the project repo, and never write it inside the project folder (no .cursor/rules, AGENTS.md or CLAUDE.md there). If that global location is missing or is a broken symlink, create the folder or file yourself. If you still cannot write it, tell your user and stop; do not fall back to the project folder.",
  "   If you have no local folder for this project: do not save a rule anywhere. On every task, report directly to AgentWitch with update_project_task resultSummary and publish_project_skill knowledge cards as above; put anything longer than the 200-char summary in your project chat reply.",
  "   Folder changes later: on every project.updated (folder_refs), re-read get_project_briefing and keep that local rule in sync. A folder was added and you work there: save the rule. The path changed: update the path in the rule. The folder was removed or you no longer work there: delete the rule and switch to reporting directly. Tell your user in one line what you changed.",
];
