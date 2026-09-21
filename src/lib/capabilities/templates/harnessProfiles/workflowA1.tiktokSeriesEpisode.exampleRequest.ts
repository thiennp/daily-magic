export const TIKTOK_SERIES_EPISODE_EXAMPLE_REQUEST = `Prepare one TikTok episode for an ongoing topic series on the operator's Mac.

Read seriesName, seriesTopics, episodeAngle, targetLength, toneStyle (when set), episodeNumber (when set), and seriesHistoryPath from the workflow form.

## 1. Series context and script draft (this step only)
Load seriesHistoryPath on the Mac when provided. List hooks, premises, and CTAs to avoid from the last five history entries.
State in one sentence how this episode advances the series arc. Summarize dedupe notes in [[PROGRESS]].

Open with a 1–2 second pattern interrupt tied to episodeAngle.
Draft beat outline, timed voiceover for targetLength (15s, 30s, or 60s), and on-screen text cues for key numbers or steps.
Match toneStyle when set; otherwise clear, punchy, mobile-first delivery.
Do not append to seriesHistoryPath yet and do not call the script final — the operator approves at the next human checkpoint.

## 2. Final script and film pack (this step only)
Continue from prior operator answers and any script feedback from the approval checkpoint.

Finalize hook, beats, voiceover timing, and on-screen text for targetLength.
Resolve any overlap the operator flagged with recent episode hooks.
Provide a vertical 9:16 shot list: framing, action, B-roll, props, screen recordings, or jump cuts.
Draft caption, 3–8 hashtags, and optional pinned comment.
Summarize the film-ready package in [[PROGRESS]]. Filming and posting stay with the operator.

## 3. History and momentum (this step only)
Continue when the operator confirms they filmed and published (or when they ask to update history).

Append a concise episode summary to seriesHistoryPath on the Mac: hook, angle, CTA, and publish notes.
Suggest one next episode angle to maintain series momentum.
Summarize in plain language what was written to history and the suggested follow-up episode.`;
