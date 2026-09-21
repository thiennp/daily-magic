export const TEAM_REPO_STANDUP_EXAMPLE_REQUEST = `Summarize git activity on a teammate's Mac for a standup update.

Read repoPath, branch, and since (optional) from the workflow form.

## 1. Resolve repo and collect git facts (this step only)
- Treat repoPath as the project folder on this Mac; expand ~ when present.
- Verify it is a git repository and the named branch exists (local or sensible remote tracking).
- If repoPath or branch is missing or ambiguous, list what you still need in [[PROGRESS]]; the operator confirms at the next checkpoint.
- Honor since when set; otherwise pick a defensible window (merge-base with default branch or last 7 days) and say which in [[PROGRESS]].
- Use read-only git commands only (log, shortstat, merge-base as needed).
- Capture commit subjects, authors, themes, and risky touch areas — facts only, no standup prose yet.

## 2. Draft standup update (this step only)
Continue from prior operator answers and the git facts you already collected.

- Write plain-English bullets for someone who did not read the diffs.
- Lead with outcomes and user-visible impact; group related commits.
- Call out blockers, follow-ups, and questions for teammates.
- Keep the update paste-ready for Slack or standup chat.

Summarize the draft in [[PROGRESS]]. Do not post, send, or open pull requests — the workflow pauses for operator review next.`;
