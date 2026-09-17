export const TIKTOK_SERIES_EPISODE_EXAMPLE_REQUEST = `Prepare one TikTok episode for an ongoing topic series on the operator's Mac.

Read seriesName, seriesTopics, episodeAngle, targetLength, toneStyle (when set), and episodeNumber (when set).
Load seriesHistoryPath when provided (JSON or markdown on the Mac) and list hooks, premises, and CTAs to avoid from recent entries.

## 1. Series fit and script draft
State in one sentence how this episode advances the series arc.
Cross-check episodeAngle against the last five history entries; note dedupe risks in [[PROGRESS]].
Draft a pattern-interrupt hook, beat outline, timed voiceover for targetLength (15s, 30s, or 60s), and on-screen text cues.
Match toneStyle when set; otherwise use clear, punchy, mobile-first delivery.
Do not treat the script as final — the workflow pauses for operator script approval.

## 2. Film-ready pack
Apply operator feedback from the prior checkpoint.
Finalize hook, timed script, and on-screen text for targetLength.
Add a vertical 9:16 shot list (framing, action, B-roll), props or screen-recording notes, caption, 3–8 hashtags, and optional pinned comment.
Flag any remaining overlap with recent episode hooks.

## 3. Post-publish continuity
When the operator confirms they posted, append a concise episode summary to seriesHistoryPath (hook, angle, CTA, publish notes).
Suggest one next episode angle to keep momentum.
Summarize in plain language what was delivered and where history was updated.

Emit [[PROGRESS]] through: series fit → draft script → approval gate → film pack → publish → history update.`;
