import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const PERSONAL_WEEKLY_REVIEW_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "personal-weekly-review-operator-confirm",
      title: "Confirm the week and your notes",
      content: [
        "1. Check weekOf matches the week you are reviewing.",
        "2. Skim wins, lessons, and priorities — add anything missing in plain language.",
        "3. Reply ready when the inputs feel honest enough to continue.",
      ].join("\n"),
    },
    {
      id: "personal-weekly-review-operator-clarify",
      title: "Answer reflection prompts",
      content: [
        "1. Answer the agent’s questions without polishing for an audience.",
        "2. Say if a priority should drop or if a win was smaller than it sounds.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "personal-weekly-review-operator-review",
      title: "Review your weekly review before saving",
      content: [
        "1. Read wins, lessons, priorities, and any energy check.",
        "2. Ask for edits if tone feels performative or priorities are too many.",
        "3. Reply approve when you are ready to save or share it yourself.",
      ].join("\n"),
    },
  ];
