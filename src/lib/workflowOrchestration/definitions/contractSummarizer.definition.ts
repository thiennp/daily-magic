import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLARIFY_CONTRACT = `Read contractText, focusAreas, and signingDeadline from the workflow form.

## Clarify before summarizing (this step only)
Check for missing parties, effective dates, or truncated text.
List clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not produce the final summary in this step.`;

const DRAFT_SUMMARY = `Continue from prior operator answers (see checkpoint responses above).

## Draft contract summary (this step only)
Not legal advice. For a non-lawyer reader include:
- Parties and purpose
- Key obligations with dates
- Termination, liability, and unusual clauses called out in focusAreas when set
- Plain-language risk flags and items needing lawyer review

Stop before operator approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "contract-summarizer",
  version: 2,
  capabilityName: "Contract summarizer",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm contract text and focus",
      [
        "1. Verify contractText is complete enough to summarize.",
        "2. Set focusAreas and signingDeadline when they matter.",
        "3. Reply ready when inputs are accurate.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Clarify gaps in the agreement text",
      CLARIFY_CONTRACT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions",
      [
        "1. Answer the agent’s questions with any missing context.",
        "2. Note if text is excerpt-only vs full agreement.",
        "3. Reply when done.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft obligations, dates, and risk summary",
      DRAFT_SUMMARY,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review summary before sharing",
      [
        "1. Read obligations, dates, and risk flags.",
        "2. Request edits if anything is wrong or missing.",
        "3. Reply approve when ready to use internally.",
      ].join("\n"),
    ),
  ],
};
