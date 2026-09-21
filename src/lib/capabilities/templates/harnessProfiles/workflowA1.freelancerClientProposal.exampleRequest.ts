export const FREELANCER_CLIENT_PROPOSAL_EXAMPLE_REQUEST = `Draft a client-ready proposal from the workflow form.

Read clientName, projectBrief, budgetRange, portfolioFolderPath, and proposalHistoryPath when present.
If portfolioFolderPath is empty, ask at the next human checkpoint which samples to cite — do not invent portfolio proof.

## Brief and portfolio fit
Summarize the client ask, budget constraints, and scope risks in plain language.
Skim portfolioFolderPath for relevant case studies; cite real paths or titles — never invent proof.
If proposalHistoryPath exists, note recent pitches so positioning can vary from prior outreach.
List assumptions in [[PROGRESS]] when the brief is ambiguous.

## Draft proposal (this step)
Write a client-ready draft with:
- Executive summary tied to projectBrief and clientName
- In-scope deliverables, explicit out-of-scope items, and revision rounds
- Milestone timeline with dates the operator can honor
- Pricing aligned with budgetRange, or tiered options with clear assumptions
- Optional add-ons separated from the core price
- 2–3 portfolio proof lines with outcomes (from portfolioFolderPath)

Stop before sending — the workflow pauses for operator approval at the next checkpoint.

## Finalize after approval (this step only)
Continue from operator approval or revision notes at the prior checkpoint.

Apply requested edits to scope, timeline, or pricing.
Polish formatting for email or platform upload (Upwork, CRM, etc.).
Prepare a concise log snippet the operator can append to proposalHistoryPath after they send.
Do not send email, accept contracts, or submit bids on the operator’s behalf.`;
