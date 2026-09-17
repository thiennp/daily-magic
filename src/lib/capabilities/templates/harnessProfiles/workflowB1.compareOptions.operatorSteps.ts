import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const COMPARE_OPTIONS_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "compare-options-operator-confirm",
      title: "Confirm the options and decision criteria",
      content: [
        "1. Check optionA, optionB, and criteria match what you want compared.",
        "2. Add any must-haves, budget, or timeline context in your reply if they are missing.",
        "3. Reply ready when the inputs are clear enough to continue.",
      ].join("\n"),
    },
    {
      id: "compare-options-operator-clarify",
      title: "Answer criteria and priority questions",
      content: [
        "1. Answer the agent’s questions about weights, deal-breakers, and context.",
        "2. Say which criteria matter most if you have not already.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "compare-options-operator-review",
      title: "Review the comparison and recommendation",
      content: [
        "1. Read the comparison table and the recommended path in plain language.",
        "2. Ask for a revised analysis if something important is missing.",
        "3. Reply approve when you are satisfied with the recommendation.",
      ].join("\n"),
    },
  ];
