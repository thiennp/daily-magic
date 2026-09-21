import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const AGENT_A2_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "doc-writer",
    name: "Documentation writer",
    category: "Engineering",
    description:
      "Publish-ready technical docs with overview, setup, examples, and troubleshooting.",
    exampleRequest:
      "Feature docs with overview, setup, examples, and troubleshooting from my notes.",
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
      instructionAddendum:
        "Standing specialist — paste code or notes in the task prompt; no intake form. Markdown docs suitable for repo README.",
      subagentMission:
        "You are the doc-writer subagent. Produce maintainable technical docs.",
      subagentExpertise: ["Technical writing", "Developer docs"],
      outputFormat: "Overview + setup + examples + troubleshooting.",
    },
  },
];
