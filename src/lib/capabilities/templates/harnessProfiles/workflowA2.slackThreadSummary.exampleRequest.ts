export const SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST = `Summarize a long Slack thread for someone who missed it.

Read thread, goal, and audience from the workflow form.
If audience is empty, assume a busy teammate who missed the thread and needs decisions plus next steps.

## 1. Parse the thread (this step only)
Separate firm decisions from ongoing debate.
Extract action items and owners when names or handles appear in the thread.
Flag unresolved threads, ambiguous pronouns, or decisions that still read like suggestions.

List only the clarifications you still need in [[PROGRESS]] — the operator answers at the next human checkpoint.
Do not write the final Slack-ready summary in this step.

## 2. Draft the shareable summary (this step only)
Continue from prior operator answers (see checkpoint responses above).

Use Slack-friendly markdown aligned to goal and audience from the form.

Include:
- TL;DR (two sentences max)
- Decisions with who decided when known
- Action items with owners
- Open questions or threads that still need input

Call out unresolved items explicitly instead of smoothing them over.
Stop before final operator review — they approve before posting.`;
