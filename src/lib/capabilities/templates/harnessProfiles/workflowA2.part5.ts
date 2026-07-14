import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A2_PART5: readonly PresetHarnessSeed[] = [
  {
    id: "research-brief",
    name: "Research brief",
    category: "Research",
    description: "Structure a research question into a brief with sources.",
    exampleRequest:
      "Write a research brief with key findings, open questions, and suggested next steps.",
    profile: {
      ruleFocus: [
        "Answer stated questions directly first.",
        "Label confidence when sources are thin.",
        "Separate findings from hypotheses.",
      ],
      skillSections: [
        {
          heading: "Brief",
          bullets: [
            "Frame topic for audience.",
            "Findings mapped to each question.",
            "Open questions and next research steps.",
          ],
        },
      ],
      commandSteps: [
        "Use provided sources when present.",
        "Structure for audience sophistication.",
        "List gaps if sources missing.",
      ],
      instructionAddendum:
        "Note when web or local files would improve confidence.",
      subagentMission:
        "You are the research-brief subagent. Turn questions into structured briefs.",
      subagentExpertise: [
        "Research framing",
        "Source triangulation",
        "Hypothesis discipline",
      ],
      outputFormat: "Brief with findings, gaps, and next steps.",
    },
  },
];
