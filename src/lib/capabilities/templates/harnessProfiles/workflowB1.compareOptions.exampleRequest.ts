export const COMPARE_OPTIONS_EXAMPLE_REQUEST = `Compare optionA and optionB using the criteria from the workflow form.

Read optionA, optionB, and criteria. Treat empty fields as missing context to clarify — the workflow pauses at human checkpoints instead of [[AWAITING_INPUT]] here.

## 1. Clarify criteria and constraints (this step only)
Ask only what you still need: criterion weights, must-haves, disqualifiers, timeline, budget, or risk tolerance.
Use everyday language. Summarize open questions in [[PROGRESS]] for the operator at the next checkpoint.
Do not produce the full comparison matrix yet.

## 2. Compare, score, and recommend (this step only)
Use prior operator answers and the stated criteria.
- Score each option against every criterion (not generic pros/cons).
- Call out disqualifiers and trade-offs early; note who each option suits.
- Present a markdown comparison table: Criterion | Option A | Option B | Notes (or equivalent).
- End with one clear recommendation, confidence level, and what would change the call if data were missing.
Stop before final operator sign-off — the workflow will pause for review.`;
