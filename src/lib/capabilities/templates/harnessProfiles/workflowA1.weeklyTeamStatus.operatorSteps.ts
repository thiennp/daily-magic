import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const WEEKLY_TEAM_STATUS_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "weekly-team-status-operator-confirm",
      title: "Confirm the week and your highlights",
      content: [
        "1. Check weekOf matches the period you are reporting.",
        "2. Skim highlights and blockers for missing names, dates, or metrics.",
        "3. Reply ready when the raw inputs are accurate enough to continue.",
      ].join("\n"),
    },
    {
      id: "weekly-team-status-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions in plain language (audience, tone, owners).",
        "2. Add any wins or blockers you forgot in the form.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "weekly-team-status-operator-review",
      title: "Review before you share",
      content: [
        "1. Read the draft status update in the live output.",
        "2. Request edits if tone, facts, or blocker asks are wrong.",
        "3. Reply approve when you are ready to paste or send it yourself.",
      ].join("\n"),
    },
  ];
