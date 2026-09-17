export const PR_SUMMARY_EXAMPLE_REQUEST = `Write a reviewer-ready summary for a PR or code change.

Read context (PR title, branch name, or link hints), change (what changed and why), and audience (engineers, PM, security, release notes, etc.).
Honor optional testNotes when present; otherwise ask at the human checkpoint instead of stopping mid-run.

## 1. Map context and missing facts
Tie context to a concrete PR title or branch when possible.
List only the clarifying questions you still need for a faithful summary.
Summarize gaps in [[PROGRESS]]; the operator answers at the next checkpoint.
Do not write the full review pack in this step.

## 2. Risks, blast radius, and mitigations
Continue from operator answers above.

Explain in language matched to audience:
- What changed and why it matters
- Risk areas (rollback, data, auth, perf, Mac agent, deploy order)
- Blast radius and mitigations already in the change

Call out unknowns explicitly. Do not invent test coverage.

## 3. Review pack (summary + verification)
Continue from prior steps and operator test notes.

Deliver:
- Short summary (what / why) tuned to audience
- Risk bullets with mitigations
- Actionable test and verification notes for reviewers
- Suggested PR description block (markdown) when audience is engineers

Stop before the operator shares externally — the workflow pauses for approval.`;
