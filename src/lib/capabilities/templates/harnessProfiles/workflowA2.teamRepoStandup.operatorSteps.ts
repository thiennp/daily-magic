import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TEAM_REPO_STANDUP_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "team-repo-standup-operator-prep",
      title: "Prepare repo path and branch fields",
      content: [
        "1. Set repoPath to the project folder on the teammate's Mac.",
        "2. Set branch to the branch you want summarized.",
        "3. Add since only if you need a custom time window (optional).",
        "4. Reply ready when the form matches what the agent should inspect.",
      ].join("\n"),
    },
    {
      id: "team-repo-standup-operator-scope",
      title: "Confirm standup scope",
      content: [
        "1. Answer if the agent asked which base branch or date range to use.",
        "2. Say if anything should be excluded from the standup (WIP, chores, etc.).",
        "3. Reply when scope is clear enough to draft bullets.",
      ].join("\n"),
    },
    {
      id: "team-repo-standup-operator-review",
      title: "Review before you share",
      content: [
        "1. Read the standup bullets for accuracy against what you expect on the branch.",
        "2. Ask for edits if tone, grouping, or missing work is wrong.",
        "3. Reply approve when the update is ready to paste into standup chat.",
      ].join("\n"),
    },
  ];
