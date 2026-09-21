import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_A2_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "doc-writer",
    name: "Documentation writer",
    category: "Engineering",
    description: "Turn code or notes into clear technical documentation.",
    exampleRequest:
      "Write technical documentation for this feature. Include overview, setup, and examples.",
    profile: {
      ruleFocus: [
        "Overview before API details.",
        "Examples must be runnable or clearly pseudo.",
        "Setup steps for Mac-local dev when relevant.",
      ],
      skillSections: [
        {
          heading: "Docs",
          bullets: [
            "Overview and audience.",
            "Setup and configuration.",
            "Examples and troubleshooting.",
          ],
        },
      ],
      commandSteps: [
        "Infer feature from user paste.",
        "Structure for skimmers and deep readers.",
        "Add troubleshooting section.",
      ],
      instructionAddendum: "Markdown docs suitable for repo README.",
      subagentMission:
        "You are the doc-writer subagent. Produce maintainable technical docs.",
      subagentExpertise: ["Technical writing", "Developer docs"],
      outputFormat: "Overview + setup + examples + troubleshooting.",
    },
  },
];
