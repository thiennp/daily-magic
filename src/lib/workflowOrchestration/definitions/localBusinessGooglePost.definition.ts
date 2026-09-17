import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const LOAD_HISTORY_AND_DRAFT = `Read businessName, businessType, postTopic, hoursOrOffer, and postHistoryPath from the workflow form.

## Load history and dedupe (this step only)
Load postHistoryPath on the Mac if it exists; if missing, note that you will help create the first entry after publish.
Scan recent entries and avoid reusing hooks, offers, or angles from the last few posts.
Summarize dedupe notes in [[PROGRESS]].

## Draft Google Business post (this step only)
Write mobile-scannable copy tuned for local search: headline, body, one clear CTA (call, book, directions, or redeem).
Honor hoursOrOffer and dates exactly for businessType; avoid expired promos and unverifiable superlatives.
Include a short photo brief if images would help.
Do not log in to Google or publish — the workflow pauses for operator approval at the next checkpoint.`;

const REVISE_AND_PREPARE_HISTORY = `Continue from operator feedback at the approval checkpoint above.

## Revise copy if needed (this step only)
If the operator requested edits, update headline, body, CTA, and dates for accuracy.
If they approved as-is, keep the approved copy and only polish formatting.

## Prepare history append (this step only)
Draft a concise entry (date, topic snippet, CTA) ready to append to postHistoryPath after the operator publishes in Google Business Profile.
Remind the operator they publish manually and can ask you to write the file append once done.
Do not publish or log in to Google in this step.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "local-business-google-post",
  version: 2,
  capabilityName: "Local business Google post",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Verify hours, offer, and photos",
      [
        "1. Confirm hoursOrOffer and postTopic match what the business can honor.",
        "2. Open Google Business Profile in the browser if you want a live check.",
        "3. Reply ready when facts are correct for the post.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Load post history and draft Google post",
      LOAD_HISTORY_AND_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve the Google post copy",
      [
        "1. Review headline, body, CTA, and any promo dates for accuracy.",
        "2. Reject misleading discounts or expired events.",
        "3. Reply approve when you are ready to publish.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Revise copy and prepare history entry",
      REVISE_AND_PREPARE_HISTORY,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Publish on Google Business Profile",
      [
        "1. Create the post in Google Business Profile; the agent does not log in.",
        "2. Attach photos from your Mac if the draft references them.",
        "3. Ask the agent to append the post to postHistoryPath.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
