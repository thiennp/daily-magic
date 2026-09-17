import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const PR_SUMMARY_OPERATOR_STEPS: readonly OperatorStepDefinition[] = [
  {
    id: "pr-summary-operator-confirm",
    title: "Confirm PR context and audience",
    content: [
      "1. Check context (PR, branch, or link) and audience feel right.",
      "2. Paste or refine change so reviewers know scope.",
      "3. Reply ready when the inputs are accurate enough to continue.",
    ].join("\n"),
  },
  {
    id: "pr-summary-operator-gaps",
    title: "Answer gaps and test notes",
    content: [
      "1. Answer any clarifying questions from the agent.",
      "2. Add how you tested or what reviewers should verify.",
      "3. Reply when reviewers would have enough to judge the change.",
    ].join("\n"),
  },
  {
    id: "pr-summary-operator-review",
    title: "Review the summary before you share",
    content: [
      "1. Read the summary, risks, and verification notes.",
      "2. Ask for edits if tone or facts are wrong.",
      "3. Reply approve when you are ready to paste into the PR or Slack.",
    ].join("\n"),
  },
];
