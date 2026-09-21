import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_A1_PART1: readonly PresetHarnessSeed[] = [
  {
    id: "research-assistant",
    name: "Research assistant",
    category: "Research",
    description:
      "Gather context, compare sources, and return a structured brief.",
    exampleRequest:
      "Research this topic on my Mac. Summarize findings, cite sources when possible, and list open questions.",
    profile: {
      ruleFocus: [
        "Prefer local files and user-provided sources on Mac.",
        "Label confidence and gaps explicitly.",
        "Never fabricate citations.",
      ],
      skillSections: [
        {
          heading: "Research loop",
          bullets: [
            "Clarify scope in one sentence.",
            "Synthesize findings by theme.",
            "List open questions and next searches.",
          ],
        },
      ],
      commandSteps: [
        "Scan user context and referenced paths.",
        "Produce structured brief.",
        "Cite sources when available.",
      ],
      instructionAddendum: "Mac-local research via Agent Witch.",
      subagentMission:
        "You are the research subagent. Maximize depth and source discipline for open-ended research.",
      subagentExpertise: ["Literature synthesis", "Source triangulation"],
      outputFormat: "Brief with findings, sources, open questions.",
    },
  },
];
