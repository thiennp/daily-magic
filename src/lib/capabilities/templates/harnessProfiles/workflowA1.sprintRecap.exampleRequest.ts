export const SPRINT_RECAP_EXAMPLE_REQUEST = `Write a sprint recap for stakeholders. Keep it factual and action-oriented.

Read sprintName, shipped, missed (optional), and nextFocus from the workflow form.

## Normalize inputs (this step only)
Align shipped bullets to sprintName; drop duplicates and internal-only jargon where possible.
For each missed or deferred item, infer a cause category: scope, risk, or dependency.
If shipped, deferrals, or nextFocus are thin or ambiguous, ask focused clarifying questions in everyday language.
Summarize questions and a short fact table in [[PROGRESS]]; the operator answers at the next checkpoint.
Do not draft the final recap yet; the workflow pauses at human checkpoints instead of mid-run input stops.

## Draft stakeholder recap (this step only)
Continue from prior operator answers (see checkpoint responses above).
Write a concise recap suitable for email or Confluence with exactly these sections:
- **Shipped** — user-visible outcomes first; tie items to sprintName where helpful.
- **Deferred** — one line per item with cause category (scope, risk, dependency); no blame.
- **Next focus** — at most three actionable priorities for the coming sprint.

Use stakeholder-safe, factual tone. Lead with outcomes, not activity lists.
Summarize the draft in [[PROGRESS]] and stop before the operator shares it — the workflow pauses for review.`;
