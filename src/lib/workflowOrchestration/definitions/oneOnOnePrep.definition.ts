import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLARIFY_CONTEXT = `Read person, sinceLast (when provided), topics, and feedback from the workflow form.

## Clarify context and priorities (this step only)
Ask only what you still need about relationship context, recent wins or tensions, and how direct the feedback should be.
Use everyday language a busy manager can answer quickly.
Summarize open questions in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not draft the full agenda yet.`;

const DRAFT_AGENDA = `Continue from prior operator answers (see checkpoint responses above).

## Draft the 1:1 agenda (this step only)
Produce a paste-ready agenda with:
- Brief check-in tied to sinceLast when useful
- Topics from the form, prioritized with time hints
- Feedback items framed as observation + impact + request (specific and behavioral)
- Open questions that invite dialogue, not monologue
- Follow-ups to verify next time

Separate prompts from feedback bullets. End with 2–3 follow-ups for the next 1:1.
Summarize structure in [[PROGRESS]]; stop before final operator review — the workflow will pause for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "one-on-one-prep",
  version: 2,
  capabilityName: "1:1 talking points",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm who you are meeting and what matters",
      [
        "1. Check person, topics, and any feedback notes feel complete.",
        "2. Add sinceLast context if you skipped it but something important changed.",
        "3. Reply ready when the 1:1 goal is clear enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Clarify context and priorities",
      CLARIFY_CONTEXT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions",
      [
        "1. Answer the agent’s questions in plain language.",
        "2. Flag sensitive topics or tone preferences (direct vs gentle).",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft agenda, prompts, and follow-ups",
      DRAFT_AGENDA,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the agenda before your 1:1",
      [
        "1. Read the agenda, prompts, and feedback wording.",
        "2. Ask for edits if anything feels off-tone or too vague.",
        "3. Reply approve when you are ready to use it in the meeting.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
