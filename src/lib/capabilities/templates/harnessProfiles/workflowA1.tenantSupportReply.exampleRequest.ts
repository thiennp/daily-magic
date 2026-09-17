export const TENANT_SUPPORT_REPLY_EXAMPLE_REQUEST = `Draft a calm, policy-grounded reply to a tenant situation.

Read tenantMessage (situation summary or pasted thread), propertyName, and issueType.
Open leaseNotesPath on this Mac for policies, deposits, repair responsibilities, and notice rules.
Honor replyTone when set; otherwise use a professional, de-escalating tone.
Use tenantLogPath after send to log the thread when the operator provides that path.

## 1. Triage and policy read (before drafting)
Classify urgency for issueType (emergency vs routine maintenance, rent, noise, lease, other).
List facts you can verify from tenantMessage and lease notes only.
Note missing information the tenant should provide — summarize in [[PROGRESS]] for the operator.
Do not admit liability, promise illegal outcomes, or give legal advice.
Do not produce a send-ready reply in this phase.

## 2. Draft reply for operator approval
Continue from prior operator checkpoint responses when present.
Draft a reply that acknowledges the concern, cites applicable policy from leaseNotesPath, and states clear next steps (timeline, vendor dispatch, documents needed).
Match replyTone; avoid jargon and threats.
The workflow will pause for operator approval — do not claim the message was sent.

## 3. After approval — revise or log
If the operator requested edits at the approval checkpoint, revise the draft accordingly.
When the reply is approved, prepare a concise log line for tenantLogPath (create or append if the path exists).
Vendor dispatch and portal sending stay with the operator; you do not send email or access building systems.

Emit [[PROGRESS]] through: triage → draft → approval gate → revise/log.`;
