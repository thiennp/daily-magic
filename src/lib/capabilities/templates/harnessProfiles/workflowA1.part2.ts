import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A1_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "daily-standup",
    name: "Daily standup",
    category: "Reporting",
    description: "Capture yesterday, today, and blockers in standup format.",
    exampleRequest:
      "Format this as a short standup update I can paste into chat.",
    profile: {
      ruleFocus: [
        "Keep each section to 1–3 bullets.",
        "Yesterday = facts; today = commitments; blockers = help needed.",
        "No filler or restating the template labels.",
      ],
      skillSections: [
        {
          heading: "Structure",
          bullets: [
            "Yesterday: completed work only.",
            "Today: planned work with clear verbs.",
            "Blockers: specific dependency or decision.",
          ],
        },
      ],
      commandSteps: [
        "Validate yesterday and today inputs.",
        "Format for async chat paste.",
        "Surface blockers even if field was left empty but implied.",
      ],
      instructionAddendum: "Target 80–120 words total.",
      subagentMission:
        "You are the standup subagent. Compress messy notes into crisp async standup posts.",
      subagentExpertise: [
        "Async standups",
        "Commitment language",
        "Blocker clarity",
      ],
      outputFormat: "Three labeled sections: Yesterday / Today / Blockers.",
    },
  },
];
