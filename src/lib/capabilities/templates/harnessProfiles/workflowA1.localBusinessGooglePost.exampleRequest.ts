export const LOCAL_BUSINESS_GOOGLE_POST_EXAMPLE_REQUEST = `Draft a Google Business Profile post for a local business.

Read businessName, businessType, postTopic, hoursOrOffer, and postHistoryPath from the workflow form.

## 1. Load history and dedupe
Load postHistoryPath on this Mac if it exists; if missing, note that you will help seed the file after publish.
Avoid repeating hooks, offers, or angles from recent history entries.
Summarize dedupe notes in [[PROGRESS]].

## 2. Draft post copy
Write scannable mobile copy: headline, body, one clear CTA (call, book, directions, or redeem offer).
Keep hoursOrOffer and event dates accurate for businessType.
Avoid expired promos and unverifiable superlatives; suggest photos if helpful.
The workflow pauses for operator approval at the next human checkpoint — do not use [[AWAITING_INPUT]] for workflow gates.

## 3. Revise after approval and prepare history
If the operator requested edits at the approval checkpoint, apply them.
Prepare a short history entry (date, topic, CTA snippet) to append to postHistoryPath after they publish in Google Business Profile.
Google Business login and publish stay with the operator.

Emit [[PROGRESS]] through: history → draft → revise (if needed) → history append draft.`;
