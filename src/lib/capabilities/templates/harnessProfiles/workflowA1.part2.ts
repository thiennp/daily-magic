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
  {
    id: "weekly-team-status",
    name: "Weekly team status",
    category: "Reporting",
    description: "Turn highlights and blockers into a polished team update.",
    exampleRequest:
      "Write a concise team status update with bullets. Lead with outcomes and call out blockers clearly.",
    profile: {
      ruleFocus: [
        "Lead with shipped outcomes and measurable progress.",
        "Separate highlights, risks, and asks.",
        "Name owners on blockers; propose a next step or decision needed.",
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
        "Draft status using the playbook sections.",
        "Verify every blocker has an owner or explicit TBD.",
      ],
      instructionAddendum:
        "Optimize for managers scanning in under 60 seconds.",
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
  },
];
