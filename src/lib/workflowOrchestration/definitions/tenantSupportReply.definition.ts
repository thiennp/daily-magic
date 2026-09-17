import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const TRIAGE_AND_DRAFT_REPLY = `Continue from the operator’s context checkpoint when responses are present.

Read tenantMessage, propertyName, issueType, leaseNotesPath, replyTone, and tenantLogPath from the workflow form.

## Triage and draft (this step only)
Open leaseNotesPath on this Mac and read policies relevant to issueType.
Classify urgency (emergency vs routine). List verified facts and missing information from the tenant.
Draft a send-ready reply that matches replyTone (default: professional, calm).
Ground rights and timelines only in lease notes — no liability admissions or illegal promises.
Include acknowledgment, policy cite, next steps, and a realistic ETA window.
Summarize triage and present the full draft in [[PROGRESS]].
Do not use [[AWAITING_INPUT]] — the workflow pauses at human checkpoints before send.`;

const REVISE_AND_PREPARE_LOG = `Continue from the approval checkpoint response above.

## Revise or prepare log (this step only)
If the operator asked for edits, revise the draft and show the updated version in [[PROGRESS]].
If the operator approved, prepare a concise log line for tenantLogPath (read or append on this Mac when the path is set).
Do not send through email or tenant portals; the operator sends manually at the final checkpoint.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "tenant-support-reply",
  version: 2,
  capabilityName: "Tenant support reply",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Read the tenant message and lease notes",
      [
        "1. Open the tenant thread described in tenantMessage.",
        "2. Read leaseNotesPath for policies, deposits, and repair responsibilities.",
        "3. Reply ready when issueType and facts are clear.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Triage situation and draft reply for approval",
      TRIAGE_AND_DRAFT_REPLY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve the reply before sending",
      [
        "1. Review tone, legal boundaries, and next steps for the tenant.",
        "2. Reject admissions of liability or promises outside your policy.",
        "3. Reply approve when the reply is ready to send.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Revise draft or prepare tenant log line",
      REVISE_AND_PREPARE_LOG,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Send through your property portal",
      [
        "1. Paste the approved reply into email, AppFolio, or your tenant portal.",
        "2. The agent does not access building keys or schedule vendors alone.",
        "3. Ask the agent to log the thread in tenantLogPath.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
