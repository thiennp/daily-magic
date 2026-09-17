import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const VALIDATE_AND_CLARIFY = `Read candidate, role, strengths, and concerns from the workflow form.

## Validate context (this step only)
Check that strengths and concerns cite interview evidence, not generic praise or protected-class commentary.
Flag gaps, contradictions, thin examples, or missing role-fit signal.
Summarize clarifying questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not write the final debrief or recommendation in this step.`;

const DRAFT_DEBRIEF = `Continue from prior operator answers (see checkpoint responses above).

## Draft debrief (this step only)
Write for a confidential hiring committee:
- Role fit against the stated role
- Strengths with evidence from the interview
- Concerns with severity and mitigations when relevant
- Clear recommendation: hire, no-hire, or hold, with rationale tied to role fit

Stop before the operator’s final review — the workflow pauses for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "interview-debrief",
  version: 2,
  capabilityName: "Interview debrief",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm candidate, role, and interview notes",
      [
        "1. Check candidate and role match who you interviewed.",
        "2. Fill strengths with concrete interview evidence (not vibes alone).",
        "3. Add concerns if any; leave blank only when there were none.",
        "4. Reply ready when the form reflects your notes.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Validate context and list clarifying questions",
      VALIDATE_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions and add missing signal",
      [
        "1. Answer the agent’s questions with specific examples from the interview.",
        "2. Name severity for concerns (minor vs blocking) when asked.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft evidence-based debrief and recommendation",
      DRAFT_DEBRIEF,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review debrief before you share with the committee",
      [
        "1. Read strengths, concerns, and the hire / no-hire / hold recommendation.",
        "2. Ask for edits if tone is unfair or evidence is thin.",
        "3. Reply approve when you are ready to paste into your hiring doc or ATS.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
