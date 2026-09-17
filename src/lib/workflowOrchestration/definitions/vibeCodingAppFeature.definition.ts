import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const RESOLVE_AND_CLARIFY = `Resolve the working tree from appTarget (path, app name, or ask in terminal if empty — workflow will pause you at checkpoints instead of [[AWAITING_INPUT]] here).

Read featureBrief, targetSurface, stackNotes, and acceptanceNotes from the workflow form.

## Clarify first (this step only)
Ask clarifying questions about product intent, constraints, edge cases, and acceptance — only what you still need.
Use everyday language a non-technical operator can answer.
Summarize questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not propose a full implementation plan yet and do not edit product code in this step.`;

const ARCHITECTURE_AND_OPTIONS = `Continue from prior operator answers (see checkpoint responses above).

## Architecture analysis (this step only)
Explain in plain language:
- How this part of the app is put together today
- What else this change might affect
- Risks and what we will not do

Load or create feature-knowledge / architecture notes for this area. Restate relevant boundaries in [[PROGRESS]].

## Architecture decisions (when more than one reasonable approach)
If tradeoffs are unclear, prepare a markdown table: Option | What it means for you | Upsides | Downsides | Best when.
Recommend a default in [[PROGRESS]] only — the operator chooses at the next checkpoint.
Do not implement code in this step.`;

const IMPLEMENT_AND_VERIFY = `Continue from prior operator answers and any recorded architecture decision.

## Implement smallest vertical slice
Implement the smallest slice that matches the vibe and existing patterns.
Honor stackNotes and acceptanceNotes. No force-push, hook bypass, or merge.

## Knowledge + regression (required before done)
Update feature-knowledge / tests; re-index if the repo requires it.
Summarize in plain language: what changed, decisions, tests, how to try it.
Stop before final operator review — the workflow will pause for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "vibe-coding-app-feature",
  version: 2,
  capabilityName: "Add vibe coding app feature",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the vibe, screen, and which app to change",
      [
        "1. Check featureBrief and targetSurface feel right.",
        "2. If appTarget is empty or unclear, tell the agent the folder path or app name on your Mac.",
        "3. Reply ready when the goal is clear enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Resolve app folder and gather clarifying questions",
      RESOLVE_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions",
      [
        "1. Answer the agent’s questions in plain language.",
        "2. Say what must work and what can wait for later.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Architecture analysis and options table",
      ARCHITECTURE_AND_OPTIONS,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Pick an approach from the decision table (if shown)",
      [
        "1. Read the Option / Upsides / Downsides table in everyday words.",
        "2. Choose an option, or say go with the agent’s suggestion.",
        "3. Skip this checkpoint if the agent did not show a table.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Implement, document, and test",
      IMPLEMENT_AND_VERIFY,
    ),
    buildOfficialWorkflowHumanNode(
      3,
      "Review the result before you merge",
      [
        "1. Read the summary: what changed, tests, and how to try it.",
        "2. Ask for fixes if something feels wrong.",
        "3. Reply approve when you are ready to merge yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
