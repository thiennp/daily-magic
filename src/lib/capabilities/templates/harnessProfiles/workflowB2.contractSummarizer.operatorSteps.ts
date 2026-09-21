import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const CONTRACT_SUMMARIZER_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "contract-summarizer-operator-confirm",
      title: "Confirm contract text and focus",
      content: [
        "1. Paste or verify the full contract text is in the form.",
        "2. Set focusAreas if you care about specific clauses (termination, liability, IP).",
        "3. Add signingDeadline when relevant.",
        "4. Reply ready when the inputs are complete.",
      ].join("\n"),
    },
    {
      id: "contract-summarizer-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions about missing sections or ambiguous terms.",
        "2. Note if this is a draft vs executed agreement.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "contract-summarizer-operator-review",
      title: "Review summary before sharing",
      content: [
        "1. Read obligations, dates, and risk flags — this is not legal advice.",
        "2. Request edits if anything is overstated or missing a critical clause.",
        "3. Reply approve when the summary is ready to use internally.",
      ].join("\n"),
    },
  ];
