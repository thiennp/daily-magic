import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const SERIES_FIT_AND_SCRIPT_DRAFT = `Read seriesName, seriesTopics, episodeAngle, targetLength, toneStyle (when set), episodeNumber (when set), and seriesHistoryPath from the workflow form.

## Series context (this step only)
Load seriesHistoryPath on the Mac when provided. List hooks, premises, and CTAs to avoid from the last five history entries.
State in one sentence how this episode advances the series arc. Summarize dedupe notes in [[PROGRESS]].

## Script draft (this step only)
Open with a 1–2 second pattern interrupt tied to episodeAngle.
Draft beat outline, timed voiceover for targetLength (15s, 30s, or 60s), and on-screen text cues for key numbers or steps.
Match toneStyle when set; otherwise clear, punchy, mobile-first delivery.
Do not append to seriesHistoryPath yet and do not call the script final — the operator approves at the next human checkpoint.`;

const FILM_READY_PACK = `Continue from prior operator answers and any script feedback from the approval checkpoint.

## Final script (this step only)
Finalize hook, beats, voiceover timing, and on-screen text for targetLength.
Resolve any overlap the operator flagged with recent episode hooks.

## Visual and publish pack (this step only)
Provide a vertical 9:16 shot list: framing, action, B-roll, props, screen recordings, or jump cuts.
Draft caption, 3–8 hashtags, and optional pinned comment.
Summarize the film-ready package in [[PROGRESS]]. Filming and posting stay with the operator.`;

const POST_PUBLISH_CONTINUITY = `Continue when the operator confirms they filmed and published (or when they ask to update history).

## History and momentum (this step only)
Append a concise episode summary to seriesHistoryPath on the Mac: hook, angle, CTA, and publish notes.
Suggest one next episode angle to maintain series momentum.
Summarize in plain language what was written to history and the suggested follow-up episode.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "tiktok-series-episode",
  version: 2,
  capabilityName: "TikTok series episode",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the series brief and past episodes",
      [
        "1. Read seriesName and seriesTopics so this episode fits the arc.",
        "2. Open seriesHistoryPath on your Mac if set and skim recent hooks and angles.",
        "3. Reply ready when episodeAngle and targetLength are final enough to script.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Series fit and script draft",
      SERIES_FIT_AND_SCRIPT_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve the script before filming",
      [
        "1. Review hook, beats, on-screen text, and voiceover for the target length.",
        "2. Reject or edit anything that repeats a recent episode hook too closely.",
        "3. Reply approve when you are ready to film with this script.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Shot list, caption, and publish pack",
      FILM_READY_PACK,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Film and publish on your side",
      [
        "1. Record using the shot list; the agent does not operate the camera.",
        "2. Paste caption and hashtags from the deliverable into TikTok when you post.",
        "3. Ask the agent to append this episode to seriesHistoryPath after you publish.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Update series history and suggest next episode",
      POST_PUBLISH_CONTINUITY,
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
