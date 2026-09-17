import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const DAILY_STANDUP_OPERATOR_STEPS: readonly OperatorStepDefinition[] = [
  {
    id: "daily-standup-operator-confirm",
    title: "Confirm yesterday, today, and blockers",
    content: [
      "1. Check yesterday and today capture real work — verbs and outcomes, not vague status.",
      "2. Add blockers even if the field was empty but something is blocking you.",
      "3. Reply ready when the form matches what you would say in standup.",
    ].join("\n"),
  },
  {
    id: "daily-standup-operator-clarify",
    title: "Fill in any gaps the agent flagged",
    content: [
      "1. Answer the agent’s follow-ups in plain language.",
      "2. Say skip if nothing was missing and you want the draft now.",
      "3. Reply when clarifications are done.",
    ].join("\n"),
  },
  {
    id: "daily-standup-operator-review",
    title: "Review the standup before you paste",
    content: [
      "1. Read the Yesterday / Today / Blockers draft (target 80–120 words).",
      "2. Ask for a tighter or clearer rewrite if needed.",
      "3. Reply approve when you are ready to paste into chat.",
    ].join("\n"),
  },
];
