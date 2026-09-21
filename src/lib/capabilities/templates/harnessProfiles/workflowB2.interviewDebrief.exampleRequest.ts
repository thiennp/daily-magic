export const INTERVIEW_DEBRIEF_EXAMPLE_REQUEST = `Write a fair, evidence-based interview debrief for the hiring committee.

Read candidate, role, strengths, and concerns from the workflow form.
Do not include protected-class commentary or speculation about personal life.

## Validate context
Check that strengths and concerns cite interview evidence, not generic praise or protected-class commentary.
Flag gaps, contradictions, thin examples, or missing role-fit signal.
Summarize clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not write the final debrief or recommendation in this step.

## Draft debrief
Continue from prior operator answers (see checkpoint responses above).

Write for a confidential hiring committee:
- Role fit against the stated role
- Strengths with evidence from the interview
- Concerns with severity and mitigations when relevant
- Clear recommendation: hire, no-hire, or hold, with rationale tied to role fit

Stop before the operator’s final review — the workflow pauses for approval.`;
