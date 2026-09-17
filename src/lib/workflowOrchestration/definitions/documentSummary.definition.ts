import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const READ_AND_CLARIFY = `Read source, length, and focus from the workflow form.

## Read and clarify (this step only)
Skim for thesis, constraints, decisions already made, and open questions.
If length or focus is ambiguous, or the source is incomplete for the stated focus, ask only what you still need in everyday language.
Summarize questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Separate facts in the source from inference — do not draft the final summary yet.`;

const PRODUCE_SUMMARY = `Continue from prior operator answers when present.

## Summarize for decision-makers
Write the summary to match length and focus from the form.
Structure for scanability: key takeaway, decisions, risks (with severity when implied), open questions, recommended actions.
Cite section headings or short quotes when referencing specific claims.
Clearly label any inference that goes beyond the source.
End with a short recommended-actions list the operator can use without re-reading the source.
Stop before final operator review — the workflow will pause for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "document-summary",
  version: 2,
  capabilityName: "Document summary",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm source, length, and focus",
      [
        "1. Check that source contains the full text you want summarized.",
        "2. Set length (short, medium, or long) and focus so the agent knows what matters.",
        "3. Reply ready when the inputs look correct.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Read source and gather clarifying questions",
      READ_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions (if any)",
      [
        "1. Answer the agent’s questions in plain language.",
        "2. Say skip if nothing was unclear and you want the draft now.",
        "3. Reply when you are done.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft summary, risks, and actions",
      PRODUCE_SUMMARY,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the summary before you share it",
      [
        "1. Read the summary, risks, and recommended actions for accuracy.",
        "2. Ask for a shorter version or different focus if needed.",
        "3. Reply approve when you are ready to use or share the summary.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
