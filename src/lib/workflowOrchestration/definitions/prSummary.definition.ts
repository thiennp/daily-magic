import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const MAP_CONTEXT_AND_GAPS = `Read context, change, audience, and optional testNotes from the workflow form.

## Map context and missing facts (this step only)
Tie context to a concrete PR title or branch when possible.
List only the clarifying questions you still need for a faithful summary.
Summarize gaps in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not write the full review pack in this step.`;

const RISKS_AND_REVIEW_PACK = `Continue from prior operator answers and any testNotes they provided.

## Risks, blast radius, and mitigations
Explain in language matched to audience:
- What changed and why it matters
- Risk areas (rollback, data, auth, perf, deploy order)
- Blast radius and mitigations already in the change

Call out unknowns explicitly. Do not invent test coverage.

## Review pack
Deliver:
- Short summary (what / why) tuned to audience
- Risk bullets with mitigations
- Actionable test and verification notes for reviewers
- Suggested PR description block (markdown) when audience is engineers

Stop before the operator shares externally — the workflow will pause for approval at the next checkpoint.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "pr-summary",
  version: 2,
  capabilityName: "PR / code change summary",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm PR context and audience",
      [
        "1. Check context (PR, branch, or link) and audience feel right.",
        "2. Paste or refine change so reviewers know scope.",
        "3. Reply ready when the inputs are accurate enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Map context and list clarifying questions",
      MAP_CONTEXT_AND_GAPS,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer gaps and test notes",
      [
        "1. Answer any clarifying questions from the agent.",
        "2. Add how you tested or what reviewers should verify.",
        "3. Reply when reviewers would have enough to judge the change.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Analyze risks and write the review pack",
      RISKS_AND_REVIEW_PACK,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the summary before you share",
      [
        "1. Read the summary, risks, and verification notes.",
        "2. Ask for edits if tone or facts are wrong.",
        "3. Reply approve when you are ready to paste into the PR or Slack.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
