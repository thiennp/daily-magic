import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";

export const WORKFLOW_A1_PART4: readonly PresetHarnessSeed[] = [
  {
    id: "meeting-notes-actions",
    name: "Meeting notes → actions",
    category: "Communication",
    description: "Convert messy notes into decisions and action items.",
    exampleRequest:
      "Produce meeting notes with decisions, owners, and action items.",
    profile: {
      ruleFocus: [
        "Every action has owner and due hint (or TBD explicitly).",
        "Decisions are stated as decided, not discussed.",
        "Attribute contentious points neutrally.",
      ],
      skillSections: [
        {
          heading: "Extract",
          bullets: [
            "Pull decisions from notes even if implicit.",
            "Merge duplicate action items.",
            "Flag open questions separately from actions.",
          ],
        },
      ],
      commandSteps: [
        "Title meeting from meetingTitle.",
        "List attendees when provided.",
        "Output decisions then action table.",
      ],
      instructionAddendum: "Use a markdown action table when helpful.",
      subagentMission:
        "You are the meeting-notes subagent. Extract accountable actions from raw notes.",
      subagentExpertise: [
        "Decision extraction",
        "Action item hygiene",
        "Neutral facilitation tone",
      ],
      outputFormat: "Decisions list + action items with owner and due.",
    },
  },
];
