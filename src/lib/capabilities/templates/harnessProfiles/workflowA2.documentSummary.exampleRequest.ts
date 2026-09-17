export const DOCUMENT_SUMMARY_EXAMPLE_REQUEST = `Produce a decision-ready summary from pasted source material.

Read source (full text), length (short, medium, or long), and focus (what the reader cares about most).
Honor length for depth and word budget; apply focus as a lens across the whole document.
Separate facts stated in the source from reasonable inference — label inference clearly.

## 1. Read and clarify (before drafting)
Skim for thesis, constraints, decisions already made, and open questions.
If length or focus is ambiguous, or the source is incomplete for the stated focus, ask only what you still need in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not deliver the final summary in this step.

## 2. Summarize for decision-makers
Using prior operator answers when present, write the summary to match length and focus.
Structure for scanability: key takeaway, decisions, risks (with severity when implied), open questions, recommended actions.
Cite section headings or short quotes when referencing specific claims.
End with a short "Recommended actions" list the operator can act on without re-reading the source.`;
