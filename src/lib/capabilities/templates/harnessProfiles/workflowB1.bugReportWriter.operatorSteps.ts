import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const BUG_REPORT_WRITER_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "bug-report-writer-operator-inputs",
      title: "Confirm repro details in the workflow form",
      content: [
        "1. Check summary, steps, expected vs actual, and severity in the form.",
        "2. Paste logs or screenshots into the steps field if you have them.",
        "3. Reply ready when the rough repro is complete enough to tighten.",
      ].join("\n"),
    },
    {
      id: "bug-report-writer-operator-clarify",
      title: "Fill gaps the agent flagged",
      content: [
        "1. Answer environment questions (browser, OS, account, build).",
        "2. Say how often it happens and whether it blocks work.",
        "3. Reply when clarifications are done.",
      ].join("\n"),
    },
    {
      id: "bug-report-writer-operator-review",
      title: "Review the ticket before you file it",
      content: [
        "1. Read the drafted title, repro, expected/actual, and severity.",
        "2. Ask for edits if steps are unclear or severity feels wrong.",
        "3. Reply approve when the ticket is ready to paste into your tracker.",
      ].join("\n"),
    },
  ];
