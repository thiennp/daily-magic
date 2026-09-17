import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const GROUND_AND_DRAFT = `Read shopName, inboxFocus, ordersFolderPath, policiesFolderPath, and replyTone (when set) from the workflow form.

## Ground truth and drafts (this step only)
- Load shipping, refund, and replacement rules from policiesFolderPath on this Mac.
- Scope work to threads described in inboxFocus (WISMO, refunds, general support).
- Match each thread to orders under ordersFolderPath (email, order ID, fulfillment, carrier, tracking, last scan).
- For every thread that needs a reply, draft one customer-facing message in [[PROGRESS]]:
  - Answer the question first; empathize without admitting liability.
  - Cite only facts from order files and policies — never invent tracking or dates.
  - Honor replyTone when set; otherwise warm, concise, and policy-safe.
- Never promise refunds, replacements, or delivery dates outside policy.
- Do not send email or mark tickets resolved; the workflow pauses at the next human checkpoint for approval.`;

const FINALIZE_AND_LOG = `Continue from operator-approved drafts (see checkpoint responses above).

## Finalize for send and logging (this step only)
- Apply per-thread edits the operator requested before treating a draft as approved.
- List approved vs needs-rework threads in [[PROGRESS]] in plain language.
- When supportLogPath is set, prepare one-line resolution lines ready to append after send.
- When supportLogPath is empty, put the same log lines in [[PROGRESS]] for the operator to paste later.
- Remind the operator they send from Shopify, Etsy, email, or their helpdesk — you do not send on their behalf.
Stop before the final send checkpoint; the workflow pauses for the operator to send.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "shop-order-support",
  version: 2,
  capabilityName: "Shop order support",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Open customer messages and order records",
      [
        "1. Open the support inbox described in inboxFocus.",
        "2. Cross-check ordersFolderPath for tracking and fulfillment status.",
        "3. Reply ready when the messages to answer are visible.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Ground orders and draft policy-safe replies",
      GROUND_AND_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve each customer reply",
      [
        "1. Review drafts for tone, refund policy, and factual order details.",
        "2. Reject promises the shop cannot keep (shipping dates, refunds).",
        "3. Reply approve per message before the agent marks it ready to send.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Finalize approved drafts and support log lines",
      FINALIZE_AND_LOG,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Send replies from your shop tools",
      [
        "1. Paste approved replies into Shopify, Etsy, email, or your helpdesk.",
        "2. The agent does not send customer email on your behalf.",
        "3. Ask the agent to append resolved threads to supportLogPath.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
