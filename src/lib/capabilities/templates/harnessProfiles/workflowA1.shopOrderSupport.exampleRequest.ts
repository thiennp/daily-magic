export const SHOP_ORDER_SUPPORT_EXAMPLE_REQUEST = `Handle customer support for shopName using inboxFocus.

Read ordersFolderPath and policiesFolderPath on this Mac before drafting anything.
Honor replyTone when set; otherwise use warm, concise, policy-safe language.
Append resolutions to supportLogPath when set after the operator sends.

## Ground truth and drafts (this step only)
Load shipping, refund, and replacement rules from policiesFolderPath on this Mac.
Scope work to threads described in inboxFocus (WISMO, refunds, general support).
Match each thread to orders under ordersFolderPath (email, order ID, fulfillment, carrier, tracking, last scan).
For every thread that needs a reply, draft one customer-facing message in [[PROGRESS]]:
- Answer the question first; empathize without admitting liability.
- Cite only facts from order files and policies — never invent tracking or dates.
- Honor replyTone when set; otherwise warm, concise, and policy-safe.
Never promise refunds, replacements, or delivery dates outside policy.
Do not send email or mark tickets resolved; the workflow pauses at the next human checkpoint for approval.

## Finalize for send and logging (this step only)
Continue from operator-approved drafts (see checkpoint responses above).

Apply per-thread edits the operator requested before treating a draft as approved.
List approved vs needs-rework threads in [[PROGRESS]] in plain language.
When supportLogPath is set, prepare one-line resolution lines ready to append after send.
When supportLogPath is empty, put the same log lines in [[PROGRESS]] for the operator to paste later.
Remind the operator they send from Shopify, Etsy, email, or their helpdesk — you do not send on their behalf.
Stop before the final send checkpoint; the workflow pauses for the operator to send.`;
