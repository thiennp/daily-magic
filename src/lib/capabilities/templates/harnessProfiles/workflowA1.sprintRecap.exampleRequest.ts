export const SPRINT_RECAP_EXAMPLE_REQUEST = `Write a sprint recap for stakeholders. Keep it factual and action-oriented.

Read sprintName, shipped, missed (optional), and nextFocus from the workflow form.

## Normalize inputs
Align shipped to sprintName. Tag each deferral with scope, risk, or dependency.
Ask only what is missing in [[PROGRESS]] for the next checkpoint.
Do not draft the full recap in this step.

## Draft recap
Continue from prior operator answers (see checkpoint responses above).
Sections: Shipped (outcomes first) / Deferred (one line each, no blame) / Next focus (max three priorities).
Stop before final operator review — the workflow will pause for approval.`;
