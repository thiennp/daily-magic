import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const CONTRACT_SUMMARIZER_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "contract-summarizer-operator-confirm",
      title: "Confirm contract text and focus",
      content: [
        "1. Verify contractText is complete enough to summarize.",
        "2. Set focusAreas and signingDeadline when they matter.",
        "3. Reply ready when inputs are accurate.",
      ].join("\n"),
    },
    {
      id: "contract-summarizer-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions with any missing context.",
        "2. Note if text is excerpt-only vs full agreement.",
        "3. Reply when done.",
      ].join("\n"),
    },
    {
      id: "contract-summarizer-operator-review",
      title: "Review summary before sharing",
      content: [
        "1. Read obligations, dates, and risk flags.",
        "2. Request edits if anything is wrong or missing.",
        "3. Reply approve when ready to use internally.",
      ].join("\n"),
    },
  ];
