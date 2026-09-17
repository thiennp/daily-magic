export const BUG_REPORT_WRITER_EXAMPLE_REQUEST = `Turn rough repro notes into a triage-ready bug ticket.

Read summary, steps, expectedActual, and severity from the workflow form.

## 1. Minimize repro and clarify
Turn steps into the smallest numbered list that still reproduces the bug.
Call out missing environment hints (browser, OS, app version, account type) in [[PROGRESS]].
List only clarifications you still need — the workflow pauses at the next checkpoint.

## 2. Draft the ticket
Write markdown suitable for Jira or GitHub issues:
- Title (scannable)
- Environment (unknown when not provided)
- Steps to reproduce
- Expected / Actual
- Severity with one-line impact justification
- Attachments / logs only when the operator mentioned them

## 3. Review gate
Present the draft for operator review before they paste it into a tracker.`;
