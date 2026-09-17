import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const MEETING_NOTES_ACTIONS_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "meeting-notes-actions-operator-confirm",
      title: "Confirm meeting title and raw notes",
      content: [
        "1. Check meetingTitle matches how you want the doc titled.",
        "2. Paste or fix notes so decisions and tasks are visible.",
        "3. Add attendees if you want them listed; reply ready when inputs look complete.",
      ].join("\n"),
    },
    {
      id: "meeting-notes-actions-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions about owners, dates, or what was decided.",
        "2. Say explicitly when something is still TBD.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "meeting-notes-actions-operator-correct",
      title: "Correct owners and due dates in the draft",
      content: [
        "1. Read the decisions list and action table.",
        "2. Fix wrong owners, due hints, or decision wording.",
        "3. Reply with corrections or say looks good to continue.",
      ].join("\n"),
    },
    {
      id: "meeting-notes-actions-operator-review",
      title: "Review before you share",
      content: [
        "1. Read the final markdown for tone and accuracy.",
        "2. Ask for edits if anything is missing or too strong.",
        "3. Reply approve when you are ready to paste it yourself.",
      ].join("\n"),
    },
  ];
