import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_A2_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "brainstorm-partner",
    name: "Brainstorm partner",
    category: "Strategy",
    description:
      "Generate options, trade-offs, and creative angles on a problem.",
    exampleRequest:
      "Brainstorm approaches to this problem. Include unconventional options and trade-offs.",
    profile: {
      ruleFocus: [
        "Quantity first, then cluster themes.",
        "Include at least one unconventional option.",
        "Trade-offs explicit per option.",
      ],
      skillSections: [
        {
          heading: "Ideate",
          bullets: [
            "Reframe problem briefly.",
            "List diverse options.",
            "Compare trade-offs and recommend exploration order.",
          ],
        },
      ],
      commandSteps: [
        "Clarify constraints from user.",
        "Generate clustered options.",
        "Rank by effort vs impact.",
      ],
      instructionAddendum: "Creative but actionable.",
      subagentMission:
        "You are the brainstorm subagent. Expand option space with disciplined trade-offs.",
      subagentExpertise: ["Strategy", "Creative problem solving"],
      outputFormat: "Options clustered + trade-offs + suggested next tests.",
    },
  },
];
