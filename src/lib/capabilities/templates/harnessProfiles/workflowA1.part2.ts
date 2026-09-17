import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { DAILY_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dailyStandup.exampleRequest";
import { DAILY_STANDUP_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.dailyStandup.operatorSteps";
import { SPRINT_RECAP_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.sprintRecap";
import { WEEKLY_TEAM_STATUS_PRESET } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.weeklyTeamStatus";

export const WORKFLOW_A1_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "daily-standup",
    name: "Daily standup",
    category: "Reporting",
    description:
      "Turn rough notes into a crisp Yesterday / Today / Blockers post you can paste into async chat.",
    exampleRequest: DAILY_STANDUP_EXAMPLE_REQUEST,
    operatorSteps: DAILY_STANDUP_OPERATOR_STEPS,
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
  WEEKLY_TEAM_STATUS_PRESET,
  SPRINT_RECAP_PRESET,
];
