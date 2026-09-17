import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const RESEARCH_AND_DRAFT = `Continue from the operator’s job posting confirmation (checkpoint responses above).

Read targetRole, companyName, jobPostingUrl, and jobDescription from the workflow form.
Open resumeFolderPath on this Mac and use only facts found there.

## Map requirements to resume evidence
Load the job posting text (URL or pasted jobDescription).
List top requirements and match each to resume evidence; note gaps and honest bridge language.
Summarize the map in [[PROGRESS]] before drafting prose.

## Draft tailored bullets and cover letter
Rewrite 3–5 resume bullet lines with quantified outcomes only where source files support them.
Draft a cover letter under one page with role + company fit and one clear ask.
Include gap notes where experience is thin; keep plain text for Word or PDF paste.
Stop before final approval — the workflow pauses for the operator to review every claim.`;

const FINALIZE_AFTER_APPROVAL = `Continue from the operator’s approval checkpoint (fix requests in checkpoint responses above).

## Finalize pack after approval (this step only)
Apply accuracy fixes the operator requested; do not reintroduce invented facts.
Emit a submission checklist (portal steps, attachments).
When applicationHistoryPath is provided, draft one log line the operator can append after they submit — do not write the file until they ask.
The operator submits the application themselves; do not apply or send on their behalf.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "job-application-pack",
  version: 2,
  capabilityName: "Job application pack",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Open the job posting and confirm facts",
      [
        "1. Open jobPostingUrl or paste jobDescription so requirements are visible.",
        "2. Skim must-have skills and flag anything missing from resumeFolderPath.",
        "3. Reply ready when targetRole and companyName are correct.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Map requirements and draft application pack",
      RESEARCH_AND_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Approve resume bullets and cover letter",
      [
        "1. Review tailored resume changes and cover letter for accuracy.",
        "2. Reject invented employers, dates, or skills you cannot defend.",
        "3. Reply approve when you are ready to submit the application.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Finalize pack and submission checklist",
      FINALIZE_AFTER_APPROVAL,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Submit the application yourself",
      [
        "1. Upload or paste the approved materials into the employer portal.",
        "2. The agent does not submit applications on your behalf.",
        "3. Ask the agent to log this application in applicationHistoryPath.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
