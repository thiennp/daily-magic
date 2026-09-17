export const FREELANCER_CLIENT_PROPOSAL_EXAMPLE_REQUEST = `Draft a client-ready proposal from the workflow form.

Read clientName, projectBrief, budgetRange, portfolioFolderPath, and proposalHistoryPath when present.
If portfolioFolderPath is empty, ask at the next human checkpoint which samples to cite — do not invent portfolio proof.

## 1. Brief and portfolio fit (analysis only)
Summarize the client ask, constraints, and risks in plain language.
Skim portfolioFolderPath for 2–3 relevant proof points with one-line outcomes each.
If proposalHistoryPath exists, note recent pitches so positioning can vary.
List any clarifying questions in [[PROGRESS]]; the operator confirms scope at the human checkpoint — do not send yet.

## 2. Draft proposal (scope, timeline, pricing)
Produce a send-ready draft with:
- Executive summary tied to projectBrief
- In-scope deliverables, out-of-scope items, and revision rounds
- Milestone timeline the operator can honor
- Pricing aligned with budgetRange (or tiered options with assumptions)
- Optional add-ons separated from core price
- Assumptions and dependencies called out explicitly
Stop before send — the workflow pauses for operator approval.

## 3. Finalize after approval
Apply revision notes from the operator checkpoint if any.
Polish formatting for email or platform upload.
Prepare a short append entry for proposalHistoryPath after the operator sends (do not send or sign on their behalf).`;
