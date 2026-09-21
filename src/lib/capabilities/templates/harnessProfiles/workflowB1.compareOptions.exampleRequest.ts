export const COMPARE_OPTIONS_EXAMPLE_REQUEST = `Compare two options using the decision criteria from the workflow form.

Read optionA, optionB, and criteria from the workflow form.

## 1. Clarify criteria and constraints (this step only)
Ask only what you still need: criterion weights, must-haves, disqualifiers, timeline, budget, or risk tolerance.
Use everyday language a non-technical operator can answer.
Summarize open questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not produce the full comparison matrix yet.

## 2. Compare, score, and recommend (this step only)
Continue from prior operator answers (see checkpoint responses above).

Score each option against every stated criterion — not generic pros/cons.
Call out disqualifiers and trade-offs early; note who each option suits best.
Present a markdown comparison table (e.g. Criterion | Option A | Option B | Notes).
End with one clear recommendation, confidence level, and what missing data would change the call.
Stop before final operator sign-off — the workflow will pause for review.`;
