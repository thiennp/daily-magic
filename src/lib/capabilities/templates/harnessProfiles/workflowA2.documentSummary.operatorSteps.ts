import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const DOCUMENT_SUMMARY_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "document-summary-operator-confirm",
      title: "Confirm source, length, and focus",
      content: [
        "1. Check that source contains the full text you want summarized.",
        "2. Set length (short, medium, or long) and focus so the agent knows what matters.",
        "3. Reply ready when the inputs look correct.",
      ].join("\n"),
    },
    {
      id: "document-summary-operator-clarify",
      title: "Answer clarifying questions (if any)",
      content: [
        "1. Answer the agent’s questions in plain language.",
        "2. Say skip if nothing was unclear and you want the draft now.",
        "3. Reply when you are done.",
      ].join("\n"),
    },
    {
      id: "document-summary-operator-review",
      title: "Review the summary before you share it",
      content: [
        "1. Read the summary, risks, and recommended actions for accuracy.",
        "2. Ask for a shorter version or different focus if needed.",
        "3. Reply approve when you are ready to use or share the summary.",
      ].join("\n"),
    },
  ];
