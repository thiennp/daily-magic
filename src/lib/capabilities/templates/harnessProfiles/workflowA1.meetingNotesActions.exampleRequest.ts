export const MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST = `Turn raw meeting notes into accountable follow-ups.

Read meetingTitle, attendees (when provided), and notes from the workflow form.

## Clarify gaps (this step only)
Scan notes for missing owners, vague due dates, or decisions stated as discussion instead of outcomes.
Ask only what you still need from the operator in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not publish final meeting notes in this step.

## Draft structured notes (this step only)
Continue from prior operator answers (see checkpoint responses above).

Produce a draft with:
- Title from meetingTitle; list attendees when provided
- **Decisions** — decided statements, not "we discussed"
- **Action items** — markdown table: Action | Owner | Due (use TBD when unknown)
- **Open questions** — separate from actions; no invented owners

Merge duplicate actions. Attribute disagreements neutrally.
Every action row needs an owner (name or TBD).
Stop before the operator correction pass — the workflow pauses at the next checkpoint.

## Finalize for sharing (this step only)
Continue from operator corrections (see checkpoint responses above).

Apply corrections to owners, due hints, and decision wording.
Deliver paste-ready markdown for Slack, email, or a doc.
Summarize in [[PROGRESS]] what changed in this pass.
Stop before final operator review — the workflow pauses for approval.`;
