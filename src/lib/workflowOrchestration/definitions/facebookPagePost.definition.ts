import { FACEBOOK_PAGE_POST_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.facebookPagePost.operatorSteps";
import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const LOAD_HISTORY_AND_DEDUPE = `The operator has logged into Facebook and opened pageName (see checkpoint above).

Read topicBrief, mediaType, toneAndCta (when present), and postHistoryPath from the workflow form.

## Load history and dedupe (this step only)
Open postHistoryPath on the Mac; if missing, create an empty JSON array file.
Compare topicBrief against the last 10 posts for repeated themes, offers, hooks, and opening lines.
Summarize dedupe findings and any focused clarifying questions in [[PROGRESS]].
Do not draft final caption or generate media yet — the operator will confirm history setup at the next checkpoint.`;

const DRAFT_PREVIEW_AND_PREP_PUBLISH = `Continue from prior checkpoint responses and dedupe notes.

## Draft copy and media (this step only)
Write a primary caption under 400 words unless topicBrief asks for longer.
Add 3–8 relevant hashtags; match toneAndCta when present.
For image: plan or generate a 1200×630-friendly visual when mediaType requests image.
For video: outline a 15–45s script and cover frame when mediaType requests video.
For text-only: skip asset generation and state that explicitly in [[PROGRESS]].

Present a preview: caption, hashtags, media summary or paths, pageName, and how this post differs from history.
Do not publish — the workflow pauses for operator approval before publish.

## After final approval (next human checkpoint only)
When the operator replies approve at the review checkpoint, publish to pageName in the browser session and append history to postHistoryPath.
If they request edits, adjust the preview and wait for another approval cycle at the checkpoint.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "facebook-page-post",
  version: 2,
  capabilityName: "Facebook Page post",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[0].title,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[0].content,
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Load post history and dedupe angles",
      LOAD_HISTORY_AND_DEDUPE,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[1].title,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[1].content,
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft caption, media, and preview",
      DRAFT_PREVIEW_AND_PREP_PUBLISH,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[2].title,
      FACEBOOK_PAGE_POST_OPERATOR_STEPS[2].content,
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
