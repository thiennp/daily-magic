import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TEAM_REPO_STANDUP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.teamRepoStandup.exampleRequest";
import { TEAM_REPO_STANDUP_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA2.teamRepoStandup.operatorSteps";

export const TEAM_REPO_STANDUP_PRESET: PresetHarnessSeed = {
  id: "team-repo-standup",
  name: "Repo branch standup (teammate Mac)",
  category: "Team dispatch",
  description:
    "Ask a colleague's Mac to summarize git activity on a local repo branch when you need a standup update without cloning locally.",
  exampleRequest: TEAM_REPO_STANDUP_EXAMPLE_REQUEST,
  operatorSteps: TEAM_REPO_STANDUP_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Use only repoPath, branch, since, and read-only git output on the Mac.",
      "Never force-push, rewrite history, or post standup text without operator approval.",
      "Prefer merge-base or since for commit range; say which rule you used.",
      "Plain-English bullets; no raw diff dumps in the standup.",
    ],
    skillSections: [
      {
        heading: "Git facts",
        bullets: [
          "Verify repo and branch before logging.",
          "Group commits by theme or surface area.",
        ],
      },
      {
        heading: "Standup voice",
        bullets: [
          "Outcomes first; blockers and asks last.",
          "Assume the reader did not open the diffs.",
        ],
      },
    ],
    commandSteps: [
      "Read workflow fields; resolve repoPath and branch.",
      "Collect commits in the chosen window.",
      "Draft paste-ready standup bullets; wait for review.",
    ],
    instructionAddendum:
      "This preset runs on the owner's Mac via Agent Witch — summarize local git only.",
    subagentMission:
      "You turn local branch activity into a concise standup update another teammate can paste into chat.",
    subagentExpertise: [
      "Read-only git inspection",
      "Commit grouping for standups",
      "Plain-language engineering updates",
    ],
    outputFormat:
      "Git scope note, grouped standup bullets, blockers/asks, optional one-line context.",
  },
};
