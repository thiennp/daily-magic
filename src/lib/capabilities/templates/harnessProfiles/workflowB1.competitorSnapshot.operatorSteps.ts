import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const COMPETITOR_SNAPSHOT_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "competitor-snapshot-operator-confirm",
      title: "Confirm competitor, focus lens, and output format",
      content: [
        "1. Check competitor names the right company or product.",
        "2. Confirm focus states what we care about (not a generic SWOT).",
        "3. Set format if empty (e.g. exec brief, battlecard, slide bullets).",
        "4. Reply ready when inputs are good to continue.",
      ].join("\n"),
    },
    {
      id: "competitor-snapshot-operator-clarify",
      title: "Answer evidence and scope questions",
      content: [
        "1. Answer the agent’s clarification questions in plain language.",
        "2. Share links, docs, or firsthand context the agent cannot infer.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "competitor-snapshot-operator-review",
      title: "Review the snapshot before you share",
      content: [
        "1. Read positioning, strengths/weaknesses vs focus, and implications.",
        "2. Ask for edits if facts feel unverified or implications are off.",
        "3. Reply approve when you are ready to share the snapshot yourself.",
      ].join("\n"),
    },
  ];
