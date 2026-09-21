export const RESOLVE_AND_CLARIFY = `Resolve the working tree from appTarget (folder path or local app name from the workflow form).

Preflight before anything else:
- Confirm the folder exists and is a git repository (git -C <appTarget> rev-parse --show-toplevel).
- If it is missing, is not a git repo, or has uncommitted work you did not expect, report exactly that in [[PROGRESS]] and stop — do not edit files and do not guess another folder.

Read featureBrief, targetSurface, stackNotes, and acceptanceNotes from the workflow form.

## Clarify first (this step only)
Ask clarifying questions about product intent, constraints, edge cases, and acceptance — only what you still need.
Use everyday language a non-technical operator can answer.
Summarize questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not propose a full implementation plan yet and do not edit product code in this step.`;

export const ARCHITECTURE_AND_OPTIONS = `Continue from prior operator answers (see checkpoint responses above).

## Architecture analysis (this step only)
Explain in plain language:
- How this part of the app is put together today
- What else this change might affect
- Risks and what we will not do

Load or create feature-knowledge / architecture notes for this area. Restate relevant boundaries in [[PROGRESS]].

## Architecture decisions (when more than one reasonable approach)
If tradeoffs are unclear, prepare a markdown table: Option | What it means for you | Upsides | Downsides | Best when.
Recommend a default in [[PROGRESS]] only — the operator chooses at the next checkpoint.
Do not implement code in this step.`;

export const IMPLEMENT_SLICE = `Continue from prior operator answers and any recorded architecture decision.

## Implement smallest vertical slice (this step only)
Implement the smallest slice that matches the vibe and existing patterns.
Honor stackNotes and acceptanceNotes. No force-push, hook bypass, or merge.
Commit the slice on a working branch so the next step can verify it.
List touched files in [[PROGRESS]]. Do not write tests or knowledge notes yet — the next step does that.`;

export const VERIFY_AND_DOCUMENT = `Continue from the slice implemented in the previous step.

## Knowledge, tests, and summary (this step only)
Update feature-knowledge / architecture notes; re-index if the repo requires it.
Add or update regression tests that lock the new behavior, then run the repo's lint, typecheck, and test commands.
If a check fails, fix it in this step and re-run.
Summarize in plain language: what changed, decisions, tests run with their result, and how to try it.
Stop before final operator review — the workflow will pause for approval.`;

export const APPLY_REVIEW_FIXES = `The operator reviewed the result and asked for changes (see the review checkpoint response above).

## Apply requested fixes (this step only)
Apply exactly what was requested — no unrelated refactors or scope growth.
Re-run lint, typecheck, and the tests that cover the change.
Summarize what you fixed, what you deliberately left alone, and the check results.
If the request is unclear or unsafe, explain that in [[PROGRESS]] instead of guessing.`;
