export const TEAM_REPO_STANDUP_EXAMPLE_REQUEST = `Summarize git activity on a teammate's Mac for a standup update.

Read repoPath (project folder on this Mac), branch, and since (optional) from the workflow form.

## 1. Resolve repo and collect git facts
- Expand ~ in repoPath; verify the directory is a git repository.
- Confirm the branch exists (checkout or describe tracking) without destructive git operations.
- If repoPath or branch is empty or ambiguous, note what you need in [[PROGRESS]]; the operator confirms at the next human checkpoint (do not use [[AWAITING_INPUT]] here).
- Time range: honor since when set; otherwise use commits on branch since merge-base with the repo's default integration branch, or the last 7 days — state which rule you used in [[PROGRESS]].
- Run read-only git commands (log, shortstat, merge-base as needed). Capture subjects, authors, themes, and touch areas — no standup prose yet.

## 2. Draft standup bullets
- Plain-English bullets for someone who did not read the diffs.
- Lead with outcomes and user-visible impact; group related work.
- Call out blockers, follow-ups, and questions for the team.
- Keep output paste-ready for Slack or standup chat; do not post or send on the operator's behalf.

The workflow pauses for operator review after the draft — apply fixes only when asked at a later checkpoint.`;
