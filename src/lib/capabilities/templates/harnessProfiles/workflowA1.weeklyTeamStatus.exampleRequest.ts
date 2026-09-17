export const WEEKLY_TEAM_STATUS_EXAMPLE_REQUEST = `Produce a leadership-ready weekly team status from the workflow form.

Read weekOf (reporting period), highlights (wins and progress), and blockers (optional).
If blockers is empty, infer risks only when highlights clearly imply them — do not invent blockers.

## 1. Confirm inputs and clarify gaps
Map weekOf to the reporting period in the opening line.
Scan highlights for measurable outcomes; note where numbers or owners are missing.
Turn blockers into owner + impact + ask; use TBD only when the operator must supply a name at the next checkpoint.
Ask clarifying questions in everyday language — audience (exec vs team), tone, length, or missing owners.
Summarize questions in [[PROGRESS]]; do not publish a final status draft in this step.

## 2. Draft the team status update
Continue from prior operator answers at human checkpoints.
Open with a one-line summary of the week tied to weekOf.
Use bullets grouped by theme: shipped outcomes first, then risks/blockers (each with owner and ask), then priorities for next week.
Lead with outcomes and measurable progress; keep blockers escalation-ready.
Target under 250 words unless the operator asked for more; optimize for managers scanning in under 60 seconds.

## 3. Review gate
Present the draft in [[PROGRESS]] with a plain-language change log if you revised after feedback.
The workflow pauses for operator review before they share the update externally.`;
