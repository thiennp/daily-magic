export const SLACK_THREAD_SUMMARY_EXAMPLE_REQUEST = `Summarize a long Slack thread for someone who missed it.

Read thread (pasted messages), goal (what the reader needs), and audience when set.
If audience is empty, write for a busy teammate who needs decisions and next steps, not play-by-play.

## 1. Parse and clarify
Separate firm decisions from debate.
Extract action items and owners when names appear.
List ambiguities or missing owners in [[PROGRESS]] for the operator — the workflow pauses at the next checkpoint.

## 2. Draft the shareable summary
Use Slack-friendly markdown aligned to goal and audience:
- TL;DR (two sentences max)
- Decisions with who decided when known
- Action items with owners
- Open questions / unresolved threads

## 3. Review gate
Present the draft for operator review; apply edits if requested before they post to Slack.`;
