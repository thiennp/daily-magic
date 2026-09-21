export const LOCAL_BUSINESS_GOOGLE_POST_EXAMPLE_REQUEST = `Draft a Google Business Profile post for a local business.

Read businessName, businessType, postTopic, hoursOrOffer, and postHistoryPath from the workflow form.

## Load history and dedupe (this step only)
Load postHistoryPath on this Mac if it exists; if missing, note that you will help create the first entry after publish.
Scan recent entries and avoid reusing hooks, offers, or angles from the last few posts.
Summarize dedupe notes in [[PROGRESS]].

## Draft Google Business post (this step only)
Write mobile-scannable copy tuned for local search: headline, body, one clear CTA (call, book, directions, or redeem).
Honor hoursOrOffer and dates exactly for businessType; avoid expired promos and unverifiable superlatives.
Include a short photo brief if images would help.
The workflow pauses for operator approval at the next checkpoint — use human checkpoints instead of mid-run input stops for workflow gates.

## Revise copy if needed (this step only)
Continue from operator feedback at the approval checkpoint above.

If the operator requested edits, update headline, body, CTA, and dates for accuracy.
If they approved as-is, keep the approved copy and only polish formatting.

## Prepare history append (this step only)
Draft a concise entry (date, topic snippet, CTA) ready to append to postHistoryPath after the operator publishes in Google Business Profile.
Remind the operator they publish manually and can ask you to write the file append once done.
Do not publish or log in to Google in this step.`;
