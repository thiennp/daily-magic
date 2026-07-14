import buildAgentTemplate from "@/lib/capabilities/templates/buildAgentTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const AGENT_CAPABILITY_TEMPLATES_A: readonly AgentCapabilityTemplate[] =
  [
    buildAgentTemplate(
      "research-assistant",
      "Research",
      "Research assistant",
      "Gather context, compare sources, and return a structured brief.",
      "Research this topic on my Mac. Summarize findings, cite sources when possible, and list open questions.",
    ),
    buildAgentTemplate(
      "writing-coach",
      "Communication",
      "Writing coach",
      "Polish drafts for clarity, tone, and structure.",
      "Improve this draft for clarity and tone. Preserve my voice and call out major edits.",
    ),
    buildAgentTemplate(
      "code-reviewer",
      "Engineering",
      "Code reviewer",
      "Review changes for bugs, edge cases, and maintainability.",
      "Review this code change like a senior engineer. Flag risks, missing tests, and simplifications.",
    ),
    buildAgentTemplate(
      "debugging-partner",
      "Engineering",
      "Debugging partner",
      "Help trace failures from logs, stack traces, and repro steps.",
      "Help me debug this issue. Propose hypotheses, checks, and the smallest fix.",
    ),
    buildAgentTemplate(
      "meeting-prep-assistant",
      "Communication",
      "Meeting prep assistant",
      "Build agendas, questions, and pre-reads before important meetings.",
      "Prepare me for this meeting with an agenda, key questions, and likely decisions.",
    ),
    buildAgentTemplate(
      "email-triage-assistant",
      "Communication",
      "Email triage assistant",
      "Sort inbox themes and draft replies for urgent threads.",
      "Triage these emails by urgency, summarize each thread, and draft replies where needed.",
    ),
    buildAgentTemplate(
      "doc-writer",
      "Engineering",
      "Documentation writer",
      "Turn code or notes into clear technical documentation.",
      "Write technical documentation for this feature. Include overview, setup, and examples.",
    ),
    buildAgentTemplate(
      "data-analyst",
      "Research",
      "Data analyst",
      "Analyze pasted tables or exports and surface insights.",
      "Analyze this data. Describe trends, anomalies, and recommended next analyses.",
    ),
    buildAgentTemplate(
      "brainstorm-partner",
      "Strategy",
      "Brainstorm partner",
      "Generate options, trade-offs, and creative angles on a problem.",
      "Brainstorm approaches to this problem. Include unconventional options and trade-offs.",
    ),
    buildAgentTemplate(
      "learning-tutor",
      "Personal",
      "Learning tutor",
      "Explain concepts step-by-step with examples and checks for understanding.",
      "Teach me this topic from first principles. Use examples and a short quiz at the end.",
    ),
  ];
