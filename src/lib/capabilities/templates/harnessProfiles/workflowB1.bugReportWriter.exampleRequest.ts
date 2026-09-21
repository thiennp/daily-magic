export const BUG_REPORT_WRITER_EXAMPLE_REQUEST = `Turn rough repro notes into a triage-ready bug ticket.

Read summary, steps, expectedActual, and severity from the workflow form.

## 1. Minimize repro and clarify (this step only)
Turn the rough steps into the smallest numbered list that still reproduces the bug.
Call out missing environment hints (browser, OS, app version, account type) in [[PROGRESS]].
Note attachments or logs mentioned in the form; do not invent data.

List only the questions you still need answered to write a triage-ready ticket.
Use plain language. Do not draft the final bug report yet and do not edit product code.

## 2. Draft ticket (this step only)
Continue from the operator’s clarifications at the checkpoints above.

Write a triage-ready bug report in markdown suitable for Jira or GitHub issues:
- **Title** — scannable summary from the form
- **Environment** — only what is known (say unknown when not provided)
- **Steps to reproduce** — numbered, minimal list from prior work
- **Expected** / **Actual** — unambiguous, pulled from expectedActual when present
- **Severity** — label plus one line tying impact to users or delivery
- **Attachments / logs** — section only when the operator mentioned files or paste

Put the full draft in [[PROGRESS]]. Stop before filing — the workflow pauses for operator review.`;
