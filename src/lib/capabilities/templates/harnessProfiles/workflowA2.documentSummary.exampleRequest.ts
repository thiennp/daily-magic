export const DOCUMENT_SUMMARY_EXAMPLE_REQUEST = `Produce a decision-ready summary from pasted source material.

Read source, length, and focus from the workflow form.

## 1. Read and clarify (this step only)
Skim for thesis, constraints, decisions already made, and open questions.
If length or focus is ambiguous, or the source is incomplete for the stated focus, ask only what you still need in everyday language.
Summarize questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Separate facts in the source from inference — do not draft the final summary yet.

## 2. Summarize for decision-makers (this step only)
Continue from prior operator answers when present.

Write the summary to match length and focus from the form.
Structure for scanability: key takeaway, decisions, risks (with severity when implied), open questions, recommended actions.
Cite section headings or short quotes when referencing specific claims.
Clearly label any inference that goes beyond the source.
End with a short recommended-actions list the operator can use without re-reading the source.
Stop before final operator review — the workflow will pause for approval.`;
