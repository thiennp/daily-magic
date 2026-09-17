import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const ANALYZE_AND_DRAFT_PROPOSAL = `Read clientName, projectBrief, budgetRange, portfolioFolderPath, and proposalHistoryPath from the workflow form.

## Brief and portfolio fit
Summarize the client ask, budget constraints, and scope risks in plain language.
Skim portfolioFolderPath for relevant case studies; cite real paths or titles — never invent proof.
If proposalHistoryPath exists, note recent pitches so positioning can vary from prior outreach.
List assumptions in [[PROGRESS]] when the brief is ambiguous.

## Draft proposal (this step)
Write a client-ready draft with:
- Executive summary tied to projectBrief and clientName
- In-scope deliverables, explicit out-of-scope items, and revision rounds
- Milestone timeline with dates the operator can honor
- Pricing aligned with budgetRange, or tiered options with clear assumptions
- Optional add-ons separated from the core price
- 2–3 portfolio proof lines with outcomes (from portfolioFolderPath)

Stop before sending — the workflow pauses for operator approval at the next checkpoint.`;

const FINALIZE_AFTER_APPROVAL = `Continue from operator approval or revision notes at the prior checkpoint.

## Finalize after approval (this step only)
Apply requested edits to scope, timeline, or pricing.
Polish formatting for email or platform upload (Upwork, CRM, etc.).
Prepare a concise log snippet the operator can append to proposalHistoryPath after they send.
Do not send email, accept contracts, or submit bids on the operator’s behalf.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "freelancer-client-proposal",
  version: 2,
  capabilityName: "Freelancer client proposal",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the client brief and portfolio fit",
      [
        "1. Read projectBrief and skim portfolioFolderPath for relevant proof.",
        "2. Note budgetRange constraints and any red flags in the ask.",
        "3. Reply ready when scope boundaries are clear enough to propose.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Analyze brief and draft scope, timeline, and pricing",
      ANALYZE_AND_DRAFT_PROPOSAL,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve the proposal before sending",
      [
        "1. Review scope, timeline, pricing, and assumptions for accuracy.",
        "2. Reject commitments you cannot deliver or rates below your floor.",
        "3. Reply approve when the proposal is ready to send.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Finalize proposal and history log snippet",
      FINALIZE_AFTER_APPROVAL,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Send the proposal through your channel",
      [
        "1. Email or upload the approved proposal via Upwork, email, or CRM.",
        "2. The agent does not sign contracts or accept work on your behalf.",
        "3. Ask the agent to log the pitch in proposalHistoryPath.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
