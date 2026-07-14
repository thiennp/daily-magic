import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B1_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "compare-options",
    name: "Compare options",
    category: "Research",
    description: "Build a pros/cons comparison and recommendation.",
    exampleRequest:
      "Compare the options using the criteria. End with a clear recommendation.",
    profile: {
      ruleFocus: [
        "Score against user criteria, not generic pros/cons.",
        "Call out trade-offs and who each option suits.",
        "Recommendation must pick one path with rationale.",
      ],
      skillSections: [
        {
          heading: "Compare",
          bullets: [
            "Matrix or table vs criteria.",
            "Highlight disqualifiers early.",
            "State recommendation with confidence.",
          ],
        },
      ],
      commandSteps: [
        "Parse optionA, optionB, criteria.",
        "Weight criteria if user implied priority.",
        "End with clear recommendation.",
      ],
      instructionAddendum: "Flag missing data that would change the call.",
      subagentMission:
        "You are the compare-options subagent. Produce criteria-driven recommendations.",
      subagentExpertise: ["Decision analysis", "Trade-off framing"],
      outputFormat: "Comparison table + recommendation paragraph.",
    },
  },
];
