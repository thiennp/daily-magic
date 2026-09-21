export const TENANT_SUPPORT_REPLY_EXAMPLE_REQUEST = `Draft a calm, policy-grounded reply to a tenant situation.

Read tenantMessage (situation summary or pasted thread), propertyName, and issueType.
Open leaseNotesPath on this Mac for policies, deposits, repair responsibilities, and notice rules.
Honor replyTone when set; otherwise use a professional, de-escalating tone.
Use tenantLogPath after send to log the thread when the operator provides that path.

## Triage and draft (this step only)
Continue from the operator’s context checkpoint when responses are present.

Open leaseNotesPath on this Mac and read policies relevant to issueType.
Classify urgency (emergency vs routine). List verified facts and missing information from the tenant.
Draft a send-ready reply that matches replyTone (default: professional, calm).
Ground rights and timelines only in lease notes — no liability admissions or illegal promises.
Include acknowledgment, policy cite, next steps, and a realistic ETA window.
Summarize triage and present the full draft in [[PROGRESS]].
Do not use mid-run input stops — the workflow pauses at human checkpoints before send.

## Revise or prepare log (this step only)
Continue from the approval checkpoint response above.

If the operator asked for edits, revise the draft and show the updated version in [[PROGRESS]].
If the operator approved, prepare a concise log line for tenantLogPath (read or append on this Mac when the path is set).
Do not send through email or tenant portals; the operator sends manually at the final checkpoint.`;
