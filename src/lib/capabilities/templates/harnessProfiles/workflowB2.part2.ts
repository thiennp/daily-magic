import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_B2_PART2: readonly PresetHarnessSeed[] = [
  {
    id: "incident-postmortem",
    name: "Incident postmortem draft",
    category: "Engineering",
    description:
      "Structure timeline, impact, and follow-ups after an incident.",
    exampleRequest:
      "Draft an incident postmortem with timeline, impact, root cause, and action items.",
    profile: {
      ruleFocus: [
        "Blameless tone; systems and process focus.",
        "Timeline is chronological with timestamps if given.",
        "Action items are preventive and owned.",
      ],
      skillSections: [
        {
          heading: "Postmortem",
          bullets: [
            "Impact summary first for executives.",
            "Timeline of detection → mitigation → resolution.",
            "Root cause as hypothesis with evidence.",
          ],
        },
      ],
      commandSteps: [
        "Merge timeline, impact, rootCause, followUps.",
        "Separate immediate vs long-term actions.",
        "Note monitoring gaps if implied.",
      ],
      instructionAddendum: "Suitable for internal incident doc template.",
      subagentMission:
        "You are the incident postmortem subagent. Produce blameless, actionable postmortems.",
      subagentExpertise: ["Incident response", "SRE writing"],
      outputFormat: "Impact + timeline + root cause + action items.",
    },
  },
];
