export const FACEBOOK_PAGE_POST_EXAMPLE_REQUEST = `Prepare a Facebook Page post for pageName from the workflow inputs.

Read topicBrief, mediaType, toneAndCta (when present), and postHistoryPath on this Mac.

## 1. Load history and dedupe
Open postHistoryPath; if missing, create an empty JSON array file.
Compare topicBrief against the last 10 entries for repeated themes, hooks, CTAs, and opening lines.
Summarize dedupe notes and any clarifying questions in [[PROGRESS]].
Do not draft final caption yet in this step.

## 2. Draft copy, media, and preview
Write feed-native caption and hashtags that differ from recent history.
Honor toneAndCta when present; keep copy scannable on mobile.
Generate or plan image/video only when mediaType requests it (Facebook-friendly specs).
Present a preview block: caption, hashtags, media plan or file paths, target pageName, and dedupe notes.
Do not publish in this step — the workflow pauses for operator approval at the next checkpoint.

## 3. Publish after approval (only when instructed)
When the operator explicitly approves at the final checkpoint, publish to the Facebook Page named pageName.
Append { date, pageName, caption, mediaType, topicBrief } to postHistoryPath after a successful publish.
Summarize publish result in plain language.`;
