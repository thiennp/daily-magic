export const VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST = `Add a feature to a local app from a vibe brief.

Resolve the working tree from appTarget (path, app name, or ask at the next human checkpoint if empty).
Read featureBrief, targetSurface, stackNotes, and acceptanceNotes from the workflow form.
Honor stackNotes when present; otherwise follow patterns already in the repo.

## 1. Clarify first (this step only)
Ask clarifying questions about product intent, constraints, edge cases, and acceptance — only what you still need.
Use everyday language a non-technical operator can answer.
Summarize questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not propose a full implementation plan yet and do not edit product code in this step.

## 2. Architecture analysis and decisions (this step only)
Continue from prior operator answers (see checkpoint responses above).

Explain in plain language how this part of the app is put together today, what else this change might affect, and risks.
Load or create feature-knowledge / architecture notes for this area. Restate relevant boundaries in [[PROGRESS]].

When more than one reasonable approach exists, prepare a markdown table: Option | What it means for you | Upsides | Downsides | Best when.
Recommend a default in [[PROGRESS]] only — the operator chooses at the next checkpoint.
Do not implement code in this step.

## 3. Implement, document, and test (this step only)
Continue from prior operator answers and any recorded architecture decision.

Implement the smallest slice that matches the vibe and existing patterns.
Honor stackNotes and acceptanceNotes. No force-push, hook bypass, or merge.

Update feature-knowledge / tests; re-index if the repo requires it.
Summarize in plain language: what changed, decisions, tests, how to try it.
Stop before final operator review — the workflow will pause for approval.`;
