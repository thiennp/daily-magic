export const RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST = `Turn a raw change list into customer-ready release notes.

Read version, changes, and audience from the workflow form.

## 1. Cluster and prioritize (this step only)
Group items by user-visible impact — not by internal component or ticket bucket.
Call out breaking changes, migrations, and required operator actions first.
Drop internal ticket IDs unless they help the reader.
Summarize open questions about grouping or severity in [[PROGRESS]] for the next checkpoint.
Do not write final publish-ready copy yet.

## 2. Draft customer-ready notes (this step only)
Continue from prior operator answers (see checkpoint responses above).

Produce a versioned release notes draft with clear sections (for example Features, Fixes, Breaking).
Keep sentences short; explain why each item matters when helpful.
Match the audience field tone; thank contributors only if named in changes.
The workflow will pause for final approval — do not assume publish.`;
