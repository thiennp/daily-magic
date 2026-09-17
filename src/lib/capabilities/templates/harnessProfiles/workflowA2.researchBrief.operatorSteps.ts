import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const RESEARCH_BRIEF_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "research-brief-operator-confirm",
      title: "Confirm topic, audience, and questions",
      content: [
        "1. Check topic, audience, and questions match what you need answered.",
        "2. Paste sources now if you already have them (optional).",
        "3. Reply ready when the brief goal is clear enough to continue.",
      ].join("\n"),
    },
    {
      id: "research-brief-operator-clarify",
      title: "Answer clarifying questions and add sources",
      content: [
        "1. Answer the agent’s questions in plain language.",
        "2. Add or refine sources if the agent asked for them.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "research-brief-operator-review",
      title: "Review the research brief before you share it",
      content: [
        "1. Read the summary, findings, gaps, and next steps.",
        "2. Ask for fixes if something feels wrong or overconfident.",
        "3. Reply approve when the brief is ready to use.",
      ].join("\n"),
    },
  ];
