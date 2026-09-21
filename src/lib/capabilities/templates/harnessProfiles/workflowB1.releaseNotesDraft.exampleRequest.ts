export const RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST = `Turn a raw change list into customer-ready release notes.

Read version, changes, and audience from the workflow form.
Use everyday language suited to the audience field (customers, internal teams, or partners).

## Cluster and prioritize
Group items by user-visible impact — not by internal component or ticket bucket.
Call out breaking changes, migrations, and required operator actions first.
Drop internal ticket IDs unless they help the reader.
Summarize open questions about grouping or severity in [[PROGRESS]] for the next checkpoint.
Do not publish final copy in this step.

## Draft customer-ready notes
Continue from prior operator answers (see checkpoint responses above).
Produce a versioned release notes draft with clear sections (for example Features, Fixes, Breaking).
Keep sentences short; explain *why it matters* for each bullet when helpful.
Match the audience tone; thank contributors only if named in the change list.
Stop before publish — the workflow will pause for final approval.`;
