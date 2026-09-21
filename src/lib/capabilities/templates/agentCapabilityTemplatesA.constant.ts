import buildAgentTemplate from "@/lib/capabilities/templates/buildAgentTemplate";
import type { AgentCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const AGENT_CAPABILITY_TEMPLATES_A: readonly AgentCapabilityTemplate[] =
  [
    buildAgentTemplate(
      "research-assistant",
      "Research",
      "Research assistant",
      "Deliver a structured research brief with sourced findings, confidence notes, and open questions.",
      "Structured brief on this topic with cited sources, gaps, and next searches.",
    ),
    buildAgentTemplate(
      "writing-coach",
      "Communication",
      "Writing coach",
      "Ship a clearer draft that keeps your voice, with major edits explained.",
      "Clearer draft with my voice preserved and major edits called out.",
    ),
    buildAgentTemplate(
      "code-reviewer",
      "Engineering",
      "Code reviewer",
      "Get a senior-style review with ranked risks, missing tests flagged, and a merge recommendation.",
      "Senior review with ranked risks, test gaps, and a merge verdict.",
    ),
    buildAgentTemplate(
      "debugging-partner",
      "Engineering",
      "Debugging partner",
      "Pin down root cause with ranked hypotheses, minimal checks, and the smallest viable fix.",
      "Root-cause hypotheses, ordered checks, and the smallest fix for this failure.",
    ),
    buildAgentTemplate(
      "doc-writer",
      "Engineering",
      "Documentation writer",
      "Publish-ready technical docs with overview, setup, examples, and troubleshooting.",
      "Feature docs with overview, setup, examples, and troubleshooting from my notes.",
    ),
    buildAgentTemplate(
      "data-analyst",
      "Research",
      "Data analyst",
      "Turn pasted tables or exports into trends, anomalies, and recommended next analyses.",
      "Trends, anomalies, and recommended next analyses from the data I paste.",
    ),
    buildAgentTemplate(
      "brainstorm-partner",
      "Strategy",
      "Brainstorm partner",
      "A clustered set of options with trade-offs, including at least one unconventional angle.",
      "Clustered options with trade-offs and one unconventional approach to this problem.",
    ),
    buildAgentTemplate(
      "learning-tutor",
      "Personal",
      "Learning tutor",
      "A step-by-step lesson with examples and a short quiz that checks understanding.",
      "First-principles lesson with examples and a short understanding quiz on this topic.",
    ),
  ];
