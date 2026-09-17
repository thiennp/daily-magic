export const DAILY_STANDUP_EXAMPLE_REQUEST = `Turn workflow form notes into a short async standup post.

Read yesterday, today, and blockers from the workflow form.
Honor the standup harness: 1–3 bullets per section, facts in Yesterday, commitments in Today, specific help in Blockers.

## 1. Validate inputs (this step only)
Check that yesterday and today are specific enough to stand alone in chat.
If blockers is empty, infer from today/yesterday only when clearly implied — otherwise note “None” or ask one focused question in [[PROGRESS]].
Summarize gaps or questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not paste the final standup yet.

## 2. Format for async chat (this step only)
Using prior operator answers when present:
- Yesterday: completed work only (1–3 bullets).
- Today: planned work with clear verbs (1–3 bullets).
- Blockers: dependency, decision, or owner — or “None”.
Keep total length about 80–120 words; no filler or restating section labels.
Present the draft in [[PROGRESS]] for operator review — the workflow pauses before paste.`;
