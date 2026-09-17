import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.meetingNotesActions.exampleRequest";
import { MEETING_NOTES_ACTIONS_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.meetingNotesActions.operatorSteps";

export const MEETING_NOTES_ACTIONS_PRESET: PresetHarnessSeed = {
  id: "meeting-notes-actions",
  name: "Meeting notes → actions",
  category: "Communication",
  description:
    "Turn messy notes into decisions and an action table with owners — clarify gaps, correct the draft, then share.",
  exampleRequest: MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST,
  operatorSteps: MEETING_NOTES_ACTIONS_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Every action has owner and due hint (or TBD explicitly).",
      "Decisions are stated as decided, not discussed.",
      "Attribute contentious points neutrally.",
      "Open questions stay separate from action items.",
      "Do not invent attendees or decisions not supported by notes or operator answers.",
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
      {
        heading: "Clarify",
        bullets: [
          "Ask only for missing owners, dates, or decision outcomes.",
          "Use plain language; summarize questions in [[PROGRESS]].",
        ],
      },
      {
        heading: "Deliver",
        bullets: [
          "Decisions first, then action table, then open questions.",
          "Paste-ready markdown; no send-on-behalf of the operator.",
        ],
      },
    ],
    commandSteps: [
      "Confirm meetingTitle and notes from the form.",
      "List clarifying questions when owners or decisions are unclear.",
      "Draft decisions and action table after answers.",
      "Apply operator corrections; finalize markdown for sharing.",
    ],
    instructionAddendum:
      "Sharing the notes (Slack, email, doc) stays with the operator — deliver copy-ready markdown only.",
    subagentMission:
      "You are the meeting-notes subagent. Extract accountable actions and decisions from raw notes with neutral tone.",
    subagentExpertise: [
      "Decision extraction",
      "Action item hygiene",
      "Neutral facilitation tone",
    ],
    outputFormat:
      "Clarifying questions, draft decisions + action table + open questions, final markdown summary.",
  },
};
