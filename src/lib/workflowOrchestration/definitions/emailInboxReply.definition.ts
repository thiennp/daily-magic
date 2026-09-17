import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const INDEX_KNOWLEDGE_AND_TRIAGE = `Read inboxFocus, knowledgeFolderPath, replyTone, signatureBlock, and answeredLogPath from the workflow form.

## Index knowledge and triage inbox (this step only)
Scan knowledgeFolderPath recursively for markdown, text, and PDF when readable.
Build a short topic index in [[PROGRESS]] and note gaps where the folder may not answer inbox questions.

The operator has the mailbox open on this Mac — list threads matching inboxFocus.
Skip newsletters and auto-replies unless inboxFocus includes them.
Skip threads already listed in answeredLogPath when that path is set.

Summarize each candidate thread in one line in [[PROGRESS]].
Do not draft full replies or send email in this step.`;

const DRAFT_GROUNDED_REPLIES = `Continue from prior checkpoint responses and thread summaries in [[PROGRESS]].

## Draft grounded replies (this step only)
For each thread still to handle, draft a reply grounded in knowledgeFolderPath — cite file or section per claim.
If the folder cannot support an answer, state the gap in [[PROGRESS]] for the operator at the next human checkpoint.

Match replyTone when set; include signatureBlock when set, else use a neutral professional sign-off.
Answer the ask in the first sentence; use bullets for steps or options when helpful.

Present per message in [[PROGRESS]]: thread summary, sources used, To, Subject, and full draft body.
Do not send email — the workflow pauses for operator approval next.`;

const SEND_AFTER_APPROVAL = `Continue from operator approval at the prior human checkpoint.

## Send approved replies (this step only)
Send only messages the operator explicitly approved (or save as draft if they asked).
Confirm each action in [[PROGRESS]]: thread id, subject, and outcome (sent, draft saved, or skipped).

When answeredLogPath is set, append thread id, subject, and date for each handled message to avoid duplicate replies on the next run.

Summarize in plain language: what was sent, skipped, or deferred.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "email-inbox-reply",
  version: 2,
  capabilityName: "Email inbox reply",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Open your inbox in the browser",
      [
        "1. In Chrome or Mail, log in to the mailbox you want the agent to work from.",
        "2. Open the inbox view that matches inboxFocus (unread, sender, or thread).",
        "3. Reply ready in the live terminal when the messages to handle are visible.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Index knowledge folder and triage inbox threads",
      INDEX_KNOWLEDGE_AND_TRIAGE,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Confirm the knowledge folder on your Mac",
      [
        "1. Verify knowledgeFolderPath exists and the agent can read it from this Mac.",
        "2. Keep FAQs, policies, and product notes there as markdown, text, or PDF.",
        "3. Tell the agent if anything important lives in a subfolder it should scan.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft grounded replies with previews",
      DRAFT_GROUNDED_REPLIES,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Approve each reply before it is sent",
      [
        "1. Review every drafted reply for accuracy against the knowledge folder.",
        "2. Edit or reject replies that guess beyond the provided material.",
        "3. Reply approve per message when you want the agent to send (or save as draft).",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Send approved replies and update the answered log",
      SEND_AFTER_APPROVAL,
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
