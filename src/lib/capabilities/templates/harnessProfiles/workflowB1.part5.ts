import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B1_PART5: readonly PresetHarnessSeed[] = [
  {
    id: "release-notes-draft",
    name: "Release notes draft",
    category: "Engineering",
    description: "Turn a change list into customer-ready release notes.",
    exampleRequest:
      "Draft release notes grouped by user impact. Keep language plain.",
    profile: {
      ruleFocus: [
        "Group by user-visible impact, not internal components.",
        "Plain language for audience field.",
        "Call out breaking changes prominently.",
      ],
      skillSections: [
        {
          heading: "Notes",
          bullets: [
            "Version header from input.",
            "Features / fixes / breaking sections.",
            "Thank contributors only if mentioned.",
          ],
        },
      ],
      commandSteps: [
        "Cluster changes by customer impact.",
        "Surface breaking changes first.",
        "Remove internal ticket noise unless useful.",
      ],
      instructionAddendum: "Suitable for changelog or in-app modal.",
      subagentMission:
        "You are the release-notes subagent. Turn dev changelists into user-facing notes.",
      subagentExpertise: ["Changelog writing", "Product communication"],
      outputFormat: "Versioned notes grouped by impact.",
    },
  },
];
