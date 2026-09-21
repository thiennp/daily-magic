export const ONE_ON_ONE_PREP_EXAMPLE_REQUEST = `Prepare a focused 1:1 agenda for a manager or peer conversation.

Read person, sinceLast (when provided), topics, and feedback from the workflow form.
Balance care, candor, and career growth. Keep tone supportive and direct.

## Clarify context and priorities (this step only)
Ask only what you still need about relationship context, recent wins or tensions, and how direct the feedback should be.
Use everyday language a busy manager can answer quickly.
Summarize open questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not draft the full agenda yet.

## Draft the 1:1 agenda (this step only)
Continue from prior operator answers (see checkpoint responses above).

Produce a paste-ready agenda with:
- Brief check-in tied to sinceLast when useful
- Topics from the form, prioritized with time hints
- Feedback items framed as observation + impact + request (specific and behavioral)
- Open questions that invite dialogue, not monologue
- Follow-ups to verify next time

Separate prompts from feedback bullets. End with 2–3 follow-ups for the next 1:1.
Summarize structure in [[PROGRESS]]; stop before final operator review — the workflow will pause for approval.`;
