import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CONFIRM_AND_CLARIFY = `Read weekOf, highlights, and blockers from the workflow form.

## Confirm inputs and clarify gaps (this step only)
Map weekOf to the reporting period.
Scan highlights for measurable outcomes; note missing numbers or owners.
Turn blockers into owner + impact + ask; use TBD only when the operator must name someone at the next checkpoint.
Ask clarifying questions in everyday language — audience, tone, length, or missing context.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not publish a final status draft in this step.`;

const DRAFT_STATUS = `Continue from prior operator answers (see checkpoint responses above).

## Draft the team status update (this step only)
Open with a one-line summary of the week tied to weekOf.
Use bullets grouped by theme: shipped outcomes first, then risks/blockers (owner + ask), then next-week priorities.
Lead with outcomes; keep blockers escalation-ready.
Target under 250 words unless the operator asked for more; optimize for a quick leadership scan.
Present the draft in [[PROGRESS]] — the workflow pauses for operator review before they share externally.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "weekly-team-status",
  version: 2,
  capabilityName: "Weekly team status",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the week and your highlights",
      [
        "1. Check weekOf matches the period you are reporting.",
        "2. Skim highlights and blockers for missing names, dates, or metrics.",
        "3. Reply ready when the raw inputs are accurate enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Confirm inputs and gather clarifying questions",
      CONFIRM_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions",
      [
        "1. Answer the agent’s questions in plain language (audience, tone, owners).",
        "2. Add any wins or blockers you forgot in the form.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft the team status update",
      DRAFT_STATUS,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review before you share",
      [
        "1. Read the draft status update in the live output.",
        "2. Request edits if tone, facts, or blocker asks are wrong.",
        "3. Reply approve when you are ready to paste or send it yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
