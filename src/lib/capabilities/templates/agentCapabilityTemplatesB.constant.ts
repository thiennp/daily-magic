import buildAgentTemplate from "@/lib/capabilities/templates/buildAgentTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const AGENT_CAPABILITY_TEMPLATES_B: readonly AgentCapabilityTemplate[] =
  [
    buildAgentTemplate(
      "sql-helper",
      "Engineering",
      "SQL helper",
      "Write, explain, and optimize SQL for your database questions.",
      "Help me write SQL for this question. Explain the query and note performance caveats.",
    ),
    buildAgentTemplate(
      "regex-builder",
      "Engineering",
      "Regex builder",
      "Build and test regular expressions with plain-language explanations.",
      "Build a regex for this pattern. Explain capture groups and edge cases.",
    ),
    buildAgentTemplate(
      "shell-command-helper",
      "Engineering",
      "Shell command helper",
      "Safe macOS terminal commands for file and system tasks.",
      "Suggest macOS shell commands for this task. Prefer safe, explainable commands.",
    ),
    buildAgentTemplate(
      "file-organizer",
      "Personal",
      "File organizer",
      "Plan folder cleanup and renaming on your Mac.",
      "Propose a file organization plan for this folder situation on my Mac.",
    ),
    buildAgentTemplate(
      "presentation-builder",
      "Communication",
      "Presentation builder",
      "Turn a topic into slide titles, bullets, and speaker notes.",
      "Create a presentation outline with slide titles, bullets, and speaker notes.",
    ),
    buildAgentTemplate(
      "social-post-writer",
      "Marketing",
      "Social post writer",
      "Draft LinkedIn or social posts from ideas and links.",
      "Draft a social post from this idea. Offer two tones: professional and casual.",
    ),
    buildAgentTemplate(
      "contract-summarizer",
      "Legal & Ops",
      "Contract summarizer",
      "Summarize agreements with risks, obligations, and dates.",
      "Summarize this contract for a non-lawyer. Highlight obligations, risks, and dates.",
    ),
    buildAgentTemplate(
      "travel-planner",
      "Personal",
      "Travel planner",
      "Build itineraries from dates, budget, and preferences.",
      "Plan a trip itinerary from these constraints. Include options and trade-offs.",
    ),
    buildAgentTemplate(
      "productivity-coach",
      "Personal",
      "Productivity coach",
      "Prioritize tasks and design a realistic daily plan.",
      "Help me prioritize these tasks and propose a realistic plan for today.",
    ),
    buildAgentTemplate(
      "customer-success-copilot",
      "Sales & CS",
      "Customer success copilot",
      "Draft check-ins, QBR notes, and expansion ideas for accounts.",
      "Act as my customer success copilot. Draft a check-in, risks, and next steps.",
    ),
  ];
