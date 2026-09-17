import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const SLACK_THREAD_SUMMARY_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "slack-thread-summary-operator-confirm",
      title: "Confirm thread paste, audience, and goal",
      content: [
        "1. Check the pasted thread in thread is complete (or say what is missing).",
        "2. Set audience if empty (e.g. exec, engineer, PM).",
        "3. Confirm goal states what the reader needs (decisions, actions, or context).",
        "4. Reply ready when inputs are good to continue.",
      ].join("\n"),
    },
    {
      id: "slack-thread-summary-operator-clarify",
      title: "Answer thread ambiguities",
      content: [
        "1. Answer the agent’s clarification questions in plain language.",
        "2. Name owners for action items if the thread was unclear.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "slack-thread-summary-operator-review",
      title: "Review the summary before you post",
      content: [
        "1. Read the TL;DR, decisions, actions, and open questions.",
        "2. Ask for edits if tone or depth is wrong for your audience.",
        "3. Reply approve when you are ready to paste into Slack yourself.",
      ].join("\n"),
    },
  ];
