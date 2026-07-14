import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B2_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "customer-reply-draft",
    name: "Customer reply draft",
    category: "Sales & CS",
    description: "Draft a support reply grounded in context and policy.",
    exampleRequest:
      "Draft a helpful customer reply. Be empathetic, accurate, and actionable.",
    profile: {
      ruleFocus: [
        "Empathy without over-promising.",
        "Policy context overrides friendly guesses.",
        "One clear next step for the customer.",
      ],
      skillSections: [
        {
          heading: "Support reply",
          bullets: [
            "Acknowledge issue in customer's words.",
            "Answer accurately using policy context.",
            "Close with timeline or action owner.",
          ],
        },
      ],
      commandSteps: [
        "Read customerMessage fully.",
        "Apply policyContext constraints.",
        "Match optional tone or default warm-professional.",
      ],
      instructionAddendum: "Escalate internally if policy is insufficient.",
      subagentMission:
        "You are the customer-reply subagent. Draft accurate, empathetic support responses.",
      subagentExpertise: ["Customer support", "De-escalation"],
      outputFormat: "Reply ready to send in support tool.",
    },
  },
];
