export const CONTRACT_SUMMARIZER_EXAMPLE_REQUEST = `Summarize the pasted agreement for a non-lawyer reader — not legal advice.

Read contractText, focusAreas, and signingDeadline from the workflow form.

## Clarify before summarizing
Check for missing parties, effective dates, or truncated text.
List clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not produce the final summary in this step.

## Draft contract summary
Continue from prior operator answers (see checkpoint responses above).

For a non-lawyer reader include:
- Parties and purpose
- Key obligations with dates
- Termination, liability, and unusual clauses called out in focusAreas when set
- Plain-language risk flags and items needing lawyer review

Stop before operator approval.`;
