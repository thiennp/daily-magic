import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLARIFY_GAPS = `Read meetingTitle, attendees (when provided), and notes from the workflow form.

## Clarify gaps (this step only)
Scan notes for missing owners, vague due dates, or decisions stated as discussion instead of outcomes.
Ask only what you still need in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not publish final meeting notes in this step.`;

const DRAFT_STRUCTURED_NOTES = `Continue from prior operator answers (see checkpoint responses above).

## Draft structured notes (this step only)
- Title from meetingTitle; list attendees when provided
- **Decisions** — decided statements, not "we discussed"
- **Action items** — markdown table: Action | Owner | Due (use TBD when unknown)
- **Open questions** — separate from actions; no invented owners

Merge duplicate actions. Attribute disagreements neutrally.
Every action row needs an owner (name or TBD).
Stop before the operator correction pass — the workflow pauses at the next checkpoint.`;

const FINALIZE_FOR_SHARING = `Continue from operator corrections (see checkpoint responses above).

## Finalize for sharing (this step only)
Apply corrections to owners, due hints, and decision wording.
Deliver paste-ready markdown for Slack, email, or a doc.
Summarize in [[PROGRESS]] what changed in this pass.
Stop before final operator review — the workflow pauses for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "meeting-notes-actions",
  version: 2,
  capabilityName: "Meeting notes → actions",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm meeting title and raw notes",
      [
        "1. Check meetingTitle matches how you want the doc titled.",
        "2. Paste or fix notes so decisions and tasks are visible.",
        "3. Add attendees if you want them listed; reply ready when inputs look complete.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Scan notes and list clarifying questions",
      CLARIFY_GAPS,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer clarifying questions",
      [
        "1. Answer the agent’s questions about owners, dates, or what was decided.",
        "2. Say explicitly when something is still TBD.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft decisions and action table",
      DRAFT_STRUCTURED_NOTES,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Correct owners and due dates in the draft",
      [
        "1. Read the decisions list and action table.",
        "2. Fix wrong owners, due hints, or decision wording.",
        "3. Reply with corrections or say looks good to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      2,
      "Finalize markdown for sharing",
      FINALIZE_FOR_SHARING,
    ),
    buildOfficialWorkflowHumanNode(
      3,
      "Review before you share",
      [
        "1. Read the final markdown for tone and accuracy.",
        "2. Ask for edits if anything is missing or too strong.",
        "3. Reply approve when you are ready to paste it yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
