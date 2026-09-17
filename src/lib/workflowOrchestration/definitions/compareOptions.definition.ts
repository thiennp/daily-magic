import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLARIFY_CRITERIA = `Read optionA, optionB, and criteria from the workflow form.

## Clarify criteria and constraints (this step only)
Ask only what you still need: criterion weights, must-haves, disqualifiers, timeline, budget, or risk tolerance.
Use everyday language a non-technical operator can answer.
Summarize open questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not produce the full comparison matrix yet.`;

const COMPARE_AND_RECOMMEND = `Continue from prior operator answers (see checkpoint responses above).

## Compare, score, and recommend (this step only)
Score each option against every stated criterion — not generic pros/cons.
Call out disqualifiers and trade-offs early; note who each option suits best.
Present a markdown comparison table (e.g. Criterion | Option A | Option B | Notes).
End with one clear recommendation, confidence level, and what missing data would change the call.
Stop before final operator sign-off — the workflow will pause for review.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "compare-options",
  version: 2,
  capabilityName: "Compare options",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the options and decision criteria",
      [
        "1. Check optionA, optionB, and criteria match what you want compared.",
        "2. Add any must-haves, budget, or timeline context in your reply if they are missing.",
        "3. Reply ready when the inputs are clear enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Clarify criteria weights and missing context",
      CLARIFY_CRITERIA,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer criteria and priority questions",
      [
        "1. Answer the agent’s questions about weights, deal-breakers, and context.",
        "2. Say which criteria matter most if you have not already.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Build comparison table and recommendation",
      COMPARE_AND_RECOMMEND,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the comparison and recommendation",
      [
        "1. Read the comparison table and the recommended path in plain language.",
        "2. Ask for a revised analysis if something important is missing.",
        "3. Reply approve when you are satisfied with the recommendation.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
