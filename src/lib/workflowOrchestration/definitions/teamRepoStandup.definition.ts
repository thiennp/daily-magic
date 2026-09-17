import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const RESOLVE_AND_COLLECT = `Read repoPath, branch, and since (optional) from the workflow form.

## Resolve repo (this step only)
- Treat repoPath as the project folder on this Mac; expand ~ when present.
- Verify it is a git repository and the named branch exists (local or sensible remote tracking).
- If repoPath or branch is missing or ambiguous, list what you still need in [[PROGRESS]]; the operator confirms at the next checkpoint.
- Do not draft standup bullets in this step.

## Collect git facts (this step only)
- Honor since when set; otherwise pick a defensible window (merge-base with default branch or last 7 days) and say which in [[PROGRESS]].
- Use read-only git commands only (log, shortstat, merge-base as needed).
- Capture commit subjects, authors, themes, and risky touch areas — facts only, no standup prose yet.`;

const DRAFT_STANDUP = `Continue from prior operator answers and the git facts you already collected.

## Draft standup update (this step only)
- Write plain-English bullets for someone who did not read the diffs.
- Lead with outcomes and user-visible impact; group related commits.
- Call out blockers, follow-ups, and questions for teammates.
- Keep the update paste-ready for Slack or standup chat.

Summarize the draft in [[PROGRESS]]. Do not post, send, or open pull requests — the workflow pauses for operator review next.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "team-repo-standup",
  version: 2,
  capabilityName: "Repo branch standup (teammate Mac)",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Prepare repo path and branch fields",
      [
        "1. Set repoPath to the project folder on the teammate's Mac.",
        "2. Set branch to the branch you want summarized.",
        "3. Add since only if you need a custom time window (optional).",
        "4. Reply ready when the form matches what the agent should inspect.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Resolve repo and collect git facts",
      RESOLVE_AND_COLLECT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Confirm standup scope",
      [
        "1. Answer if the agent asked which base branch or date range to use.",
        "2. Say if anything should be excluded from the standup (WIP, chores, etc.).",
        "3. Reply when scope is clear enough to draft bullets.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(1, "Draft standup bullets", DRAFT_STANDUP),
    buildOfficialWorkflowHumanNode(
      2,
      "Review before you share",
      [
        "1. Read the standup bullets for accuracy against what you expect on the branch.",
        "2. Ask for edits if tone, grouping, or missing work is wrong.",
        "3. Reply approve when the update is ready to paste into standup chat.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
