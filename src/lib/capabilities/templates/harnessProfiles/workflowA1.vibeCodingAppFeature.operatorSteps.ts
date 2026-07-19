import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const VIBE_CODING_APP_FEATURE_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "vibe-coding-app-feature-operator-confirm",
      title: "Confirm the vibe, screen, and which app to change",
      content: [
        "1. Check featureBrief and targetSurface feel right.",
        "2. If appTarget is empty or unclear, tell the agent the folder path or app name on your Mac.",
        "3. Reply ready when the goal is clear enough to continue.",
      ].join("\n"),
    },
    {
      id: "vibe-coding-app-feature-operator-clarify",
      title: "Answer clarifying questions",
      content: [
        "1. Answer the agent’s questions in plain language.",
        "2. Say what must work and what can wait for later.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "vibe-coding-app-feature-operator-decide",
      title: "Pick an approach from the decision table (if shown)",
      content: [
        "1. Read the Option / Upsides / Downsides table in everyday words.",
        "2. Choose an option, or say go with the agent’s suggestion.",
        "3. Skip this checkpoint if the agent did not show a table.",
      ].join("\n"),
    },
    {
      id: "vibe-coding-app-feature-operator-review",
      title: "Review the result before you merge",
      content: [
        "1. Read the summary: what changed, tests, and how to try it.",
        "2. Ask for fixes if something feels wrong.",
        "3. Reply approve when you are ready to merge yourself.",
      ].join("\n"),
    },
  ];
