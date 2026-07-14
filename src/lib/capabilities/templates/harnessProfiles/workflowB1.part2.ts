import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B1_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "competitor-snapshot",
    name: "Competitor snapshot",
    category: "Research",
    description: "Capture how a competitor compares on what matters to you.",
    exampleRequest:
      "Write a competitor snapshot with positioning, strengths, weaknesses, and implications.",
    profile: {
      ruleFocus: [
        "Anchor on user focus field, not generic SWOT.",
        "Distinguish verified facts from market rumor.",
        "Implications for our strategy, not theirs.",
      ],
      skillSections: [
        {
          heading: "Snapshot",
          bullets: [
            "Positioning in one paragraph.",
            "Strengths/weaknesses vs our focus.",
            "So-what implications and watch items.",
          ],
        },
      ],
      commandSteps: [
        "Name competitor clearly.",
        "Apply focus lens throughout.",
        "Respect optional format field.",
      ],
      instructionAddendum: "Note evidence gaps explicitly.",
      subagentMission:
        "You are the competitor-snapshot subagent. Deliver strategy-ready competitive intel.",
      subagentExpertise: ["Competitive analysis", "Positioning"],
      outputFormat: "Positioning + strengths/weaknesses + implications.",
    },
  },
];
