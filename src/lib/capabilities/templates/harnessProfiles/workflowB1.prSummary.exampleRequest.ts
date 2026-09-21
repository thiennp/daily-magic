export const PR_SUMMARY_EXAMPLE_REQUEST = `Write a reviewer-ready summary for a PR or code change.

Read context, change, audience, and optional testNotes from the workflow form.

## 1. Map context and missing facts (this step only)
Tie context to a concrete PR title or branch when possible.
List only the clarifying questions you still need for a faithful summary.
Summarize gaps in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not write the full review pack in this step.

## 2. Risks, blast radius, and mitigations (this step only)
Continue from prior operator answers and any testNotes they provided.

Explain in language matched to audience:
- What changed and why it matters
- Risk areas (rollback, data, auth, perf, deploy order)
- Blast radius and mitigations already in the change

Call out unknowns explicitly. Do not invent test coverage.

## 3. Review pack (this step only)
Deliver:
- Short summary (what / why) tuned to audience
- Risk bullets with mitigations
- Actionable test and verification notes for reviewers
- Suggested PR description block (markdown) when audience is engineers

Stop before the operator shares externally — the workflow will pause for approval at the next checkpoint.`;
