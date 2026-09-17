import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { WEEKLY_TEAM_STATUS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.weeklyTeamStatus.exampleRequest";
import { WEEKLY_TEAM_STATUS_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.weeklyTeamStatus.operatorSteps";

export const WEEKLY_TEAM_STATUS_PRESET: PresetHarnessSeed = {
  id: "weekly-team-status",
  name: "Weekly team status",
  category: "Reporting",
  description:
    "Turn highlights and blockers into a polished team update leaders can scan in under a minute — you share it after you approve the draft.",
  exampleRequest: WEEKLY_TEAM_STATUS_EXAMPLE_REQUEST,
  operatorSteps: WEEKLY_TEAM_STATUS_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Lead with shipped outcomes and measurable progress.",
      "Separate highlights, risks, and asks.",
      "Name owners on blockers; propose a next step or decision needed.",
      "Pause at workflow human checkpoints before calling the update share-ready.",
    ],
    skillSections: [
      {
        heading: "Gather",
        bullets: [
          "Map weekOf to the reporting period.",
          "Extract wins from highlights; quantify when possible.",
          "Turn blockers into owner + impact + ask.",
        ],
      },
      {
        heading: "Draft",
        bullets: [
          "Open with one-line summary of the week.",
          "Use bullets for highlights and blockers sections.",
          "End with priorities for next week.",
        ],
      },
    ],
    commandSteps: [
      "Confirm weekOf and highlights are present.",
      "Clarify missing owners, metrics, or audience.",
      "Draft status using the playbook sections.",
      "Verify every blocker has an owner or explicit TBD.",
    ],
    instructionAddendum: "Optimize for managers scanning in under 60 seconds.",
    subagentMission:
      "You are the weekly status subagent. Produce leadership-ready team updates from raw highlights and blockers.",
    subagentExpertise: [
      "Executive summaries",
      "Blocker escalation framing",
      "Outcome-first writing",
    ],
    outputFormat:
      "Bullets grouped by theme; blockers with owner and ask; under 250 words unless user asks for more.",
  },
};
