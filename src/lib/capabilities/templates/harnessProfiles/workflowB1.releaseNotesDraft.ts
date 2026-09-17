import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.releaseNotesDraft.exampleRequest";
import { RELEASE_NOTES_DRAFT_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.releaseNotesDraft.operatorSteps";

export const RELEASE_NOTES_DRAFT_PRESET: PresetHarnessSeed = {
  id: "release-notes-draft",
  name: "Release notes draft",
  category: "Engineering",
  description: "Turn a change list into customer-ready release notes.",
  exampleRequest: RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST,
  operatorSteps: RELEASE_NOTES_DRAFT_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Group by user-visible impact, not internal components.",
      "Plain language for the audience field.",
      "Call out breaking changes prominently.",
      "Workflow checkpoints replace [[AWAITING_INPUT]] for operator gates.",
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
      "Pause for operator review before publish.",
    ],
    instructionAddendum: "Suitable for changelog or in-app modal.",
    subagentMission:
      "You are the release-notes subagent. Turn dev changelists into user-facing notes.",
    subagentExpertise: ["Changelog writing", "Product communication"],
    outputFormat: "Versioned notes grouped by impact.",
  },
};
