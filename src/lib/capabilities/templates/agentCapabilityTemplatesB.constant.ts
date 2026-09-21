import buildAgentTemplate from "@/lib/capabilities/templates/buildAgentTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const AGENT_CAPABILITY_TEMPLATES_B: readonly AgentCapabilityTemplate[] =
  [
    buildAgentTemplate(
      "sql-helper",
      "Engineering",
      "SQL helper",
      "Correct, explained SQL with performance caveats for your question.",
      "SQL plus plain-language explanation and performance caveats for this question.",
    ),
    buildAgentTemplate(
      "regex-builder",
      "Engineering",
      "Regex builder",
      "A tested regex with capture-group notes and edge-case examples.",
      "Regex for this pattern with capture groups explained and edge-case test pairs.",
    ),
    buildAgentTemplate(
      "shell-command-helper",
      "Engineering",
      "Shell command helper",
      "Safe, explainable macOS commands for your task, with destructive steps flagged.",
      "Safe macOS commands for this task with each step explained.",
    ),
    buildAgentTemplate(
      "file-organizer",
      "Personal",
      "File organizer",
      "A folder taxonomy and migration plan for your Mac with rollback notes.",
      "Folder taxonomy and migration plan for this folder situation with rollback steps.",
    ),
    buildAgentTemplate(
      "presentation-builder",
      "Communication",
      "Presentation builder",
      "Slide titles, bullets, and speaker notes that tell one clear story.",
      "Deck outline with outcome-led slide titles, bullets, and speaker notes.",
    ),
    buildAgentTemplate(
      "productivity-coach",
      "Personal",
      "Productivity coach",
      "A realistic prioritized plan for today with top outcomes and explicit deferrals.",
      "Prioritized today plan with top three outcomes and explicit deferrals from my tasks.",
    ),
    buildAgentTemplate(
      "customer-success-copilot",
      "Sales & CS",
      "Customer success copilot",
      "Account check-in copy with health signals, risks, and concrete next steps.",
      "Check-in draft with account health, risks, and next steps for this account.",
    ),
  ];
