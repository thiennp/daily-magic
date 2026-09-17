export const MEETING_NOTES_ACTIONS_EXAMPLE_REQUEST = `Turn raw meeting notes into accountable follow-ups.

Read meetingTitle, attendees (when provided), and notes from the workflow form.

## 1. Clarify gaps (before a final doc)
Scan notes for missing owners, vague due dates, or decisions stated as discussion instead of outcomes.
List only what you still need from the operator in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not publish final meeting notes in this step.

## 2. Draft structured notes
Continue from prior operator answers.

Produce a draft with:
- Meeting title from meetingTitle and attendees when provided
- **Decisions** — each as a decided statement, not "we talked about"
- **Action items** — markdown table: Action | Owner | Due (use TBD when unknown)
- **Open questions** — separate from actions; no fake owners

Merge duplicate actions. Attribute disagreements neutrally.
Every action must have an owner column (name or TBD).
Stop before the operator’s correction pass — the workflow will pause you at the next checkpoint.

## 3. Finalize for sharing
Apply operator corrections to owners, due hints, and decision wording.
Deliver paste-ready markdown suitable for Slack, email, or a doc.
Summarize in [[PROGRESS]] what you changed in this pass.
End ready for operator review at the final checkpoint.`;
