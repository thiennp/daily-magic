import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const SPRINT_RECAP_OPERATOR_STEPS: readonly OperatorStepDefinition[] = [
  {
    id: "sprint-recap-operator-confirm",
    title: "Confirm sprint facts and audience",
    content: [
      "1. Check sprintName, shipped, missed, and nextFocus match what you will report.",
      "2. Note whether you will paste into email, chat, or Confluence.",
      "3. Reply ready when the inputs are accurate enough to draft.",
    ].join("\n"),
  },
  {
    id: "sprint-recap-operator-gaps",
    title: "Answer gaps or confirm deferral reasons",
    content: [
      "1. Answer the agent’s questions in plain language.",
      "2. Give one-line cause per deferred item (scope, risk, or dependency).",
      "3. Reply when facts are complete enough to write the recap.",
    ].join("\n"),
  },
  {
    id: "sprint-recap-operator-review",
    title: "Review before you share",
    content: [
      "1. Read the Shipped / Deferred / Next focus draft for tone and accuracy.",
      "2. Ask for edits if anything is blameful, vague, or missing context.",
      "3. Reply approve when you are ready to paste or send it yourself.",
    ].join("\n"),
  },
];
