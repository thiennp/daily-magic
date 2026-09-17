import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const ONE_ON_ONE_PREP_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "one-on-one-prep-operator-confirm",
      title: "Confirm who you are meeting and what matters",
      content: [
        "1. Check person, topics, and any feedback notes feel complete.",
        "2. Add sinceLast context if you skipped it but something important changed.",
        "3. Reply ready when the 1:1 goal is clear enough to continue.",
      ].join("\n"),
    },
    {
      id: "one-on-one-prep-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions in plain language.",
        "2. Flag sensitive topics or tone preferences (direct vs gentle).",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "one-on-one-prep-operator-review",
      title: "Review the agenda before your 1:1",
      content: [
        "1. Read the agenda, prompts, and feedback wording.",
        "2. Ask for edits if anything feels off-tone or too vague.",
        "3. Reply approve when you are ready to use it in the meeting.",
      ].join("\n"),
    },
  ];
