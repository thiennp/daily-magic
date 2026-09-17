import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const INCIDENT_POSTMORTEM_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "incident-postmortem-operator-confirm",
      title: "Confirm incident facts in the workflow form",
      content: [
        "1. Check timeline, impact, rootCause, and followUps match what you know.",
        "2. Add missing dates, services, or severity in the form or in your reply.",
        "3. Reply ready when the facts are clear enough to draft.",
      ].join("\n"),
    },
    {
      id: "incident-postmortem-operator-gaps",
      title: "Answer timeline and impact gaps",
      content: [
        "1. Read the agent’s gap list in everyday language.",
        "2. Fill missing timestamps, scope, or customer impact.",
        "3. Reply when timeline and impact are complete enough to continue.",
      ].join("\n"),
    },
    {
      id: "incident-postmortem-operator-review",
      title: "Review the postmortem draft",
      content: [
        "1. Read the full postmortem: impact, timeline, root cause, and actions.",
        "2. Request edits if tone, facts, or follow-ups need changes.",
        "3. Reply approve when the doc is ready to share internally.",
      ].join("\n"),
    },
  ];
