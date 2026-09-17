import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const PARSE_AND_CLARIFY = `Read thread, goal, and audience from the workflow form.
If audience is empty, assume a busy teammate who missed the thread and needs decisions plus next steps.

## Parse the thread (this step only)
Separate firm decisions from ongoing debate.
Extract action items and owners when names or handles appear in the thread.
Flag unresolved threads, ambiguous pronouns, or decisions that still read like suggestions.

List only the clarifications you still need in [[PROGRESS]] — the operator answers at the next human checkpoint.
Do not write the final Slack-ready summary in this step.`;

const DRAFT_SUMMARY = `Continue from prior operator answers (see checkpoint responses above).

## Draft the shareable summary (this step only)
Use Slack-friendly markdown aligned to goal and audience from the form.

Include:
- TL;DR (two sentences max)
- Decisions with who decided when known
- Action items with owners
- Open questions or threads that still need input

Call out unresolved items explicitly instead of smoothing them over.
Stop before final operator review — they approve before posting.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "slack-thread-summary",
  version: 2,
  capabilityName: "Slack thread summary",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm thread paste, audience, and goal",
      [
        "1. Check the pasted thread in thread is complete (or say what is missing).",
        "2. Set audience if empty (e.g. exec, engineer, PM).",
        "3. Confirm goal states what the reader needs (decisions, actions, or context).",
        "4. Reply ready when inputs are good to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Parse thread and surface ambiguities",
      PARSE_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer thread ambiguities",
      [
        "1. Answer the agent’s clarification questions in plain language.",
        "2. Name owners for action items if the thread was unclear.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft TL;DR, decisions, and actions",
      DRAFT_SUMMARY,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the summary before you post",
      [
        "1. Read the TL;DR, decisions, actions, and open questions.",
        "2. Ask for edits if tone or depth is wrong for your audience.",
        "3. Reply approve when you are ready to paste into Slack yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
