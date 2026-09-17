import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { COMPARE_OPTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.compareOptions.exampleRequest";
import { COMPARE_OPTIONS_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.compareOptions.operatorSteps";

export const WORKFLOW_B1_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "compare-options",
    name: "Compare options",
    category: "Research",
    description:
      "Score two paths against your criteria and get a clear recommendation — clarify weights first, then review the table before you decide.",
    exampleRequest: COMPARE_OPTIONS_EXAMPLE_REQUEST,
    operatorSteps: COMPARE_OPTIONS_OPERATOR_STEPS,
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
