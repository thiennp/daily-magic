import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B2_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "proposal-outline",
    name: "Proposal / scope outline",
    category: "Consulting",
    description: "Turn client goals into a scoped proposal outline.",
    exampleRequest:
      "Draft a proposal outline with goals, deliverables, assumptions, and timeline.",
    profile: {
      ruleFocus: [
        "Scope is explicit in and out of scope.",
        "Assumptions surface risks to timeline.",
        "Deliverables map to client goal.",
      ],
      skillSections: [
        {
          heading: "Proposal",
          bullets: [
            "Goals restated in client language.",
            "Deliverables with acceptance hints.",
            "Assumptions and dependencies listed.",
          ],
        },
      ],
      commandSteps: [
        "Anchor on client and goal.",
        "Respect constraints field.",
        "Propose phased timeline if complex.",
      ],
      instructionAddendum: "Consulting-ready outline, not full contract.",
      subagentMission:
        "You are the proposal subagent. Shape credible scope outlines from client inputs.",
      subagentExpertise: ["Consulting scoping", "SOW outlines"],
      outputFormat: "Goals + deliverables + assumptions + timeline.",
    },
  },
];
