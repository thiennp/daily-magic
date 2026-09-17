import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const TIMELINE_AND_IMPACT = `Read timeline and impact from the workflow form.

## Timeline and impact (this step only)
Write an executive impact summary first, then a chronological timeline (detection → mitigation → resolution).
Use timestamps when the operator provided them; mark unknown times as approximate.
Stay blameless — focus on systems and process, not individuals.

Summarize gaps, contradictions, or missing severity in [[PROGRESS]]; the operator will answer at the next human checkpoint.
Do not draft root cause hypotheses or action items yet.`;

const ROOT_CAUSE_AND_ACTIONS = `Continue from prior operator answers (see checkpoint responses above).

Read rootCause and followUps from the workflow form, plus the timeline and impact work from earlier steps.

## Root cause and action items (this step only)
State root cause as a hypothesis with evidence; stay blameless.
Merge impact summary, timeline, root cause, and follow-ups into one postmortem document.
Separate immediate mitigations from long-term preventive actions; note owners when given.
Call out monitoring or runbook gaps if implied.

Stop before final operator review — the workflow will pause for approval.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "incident-postmortem",
  version: 2,
  capabilityName: "Incident postmortem draft",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm incident facts in the workflow form",
      [
        "1. Check timeline, impact, rootCause, and followUps match what you know.",
        "2. Add missing dates, services, or severity in the form or in your reply.",
        "3. Reply ready when the facts are clear enough to draft.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Draft timeline and impact summary",
      TIMELINE_AND_IMPACT,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer timeline and impact gaps",
      [
        "1. Read the agent’s gap list in everyday language.",
        "2. Fill missing timestamps, scope, or customer impact.",
        "3. Reply when timeline and impact are complete enough to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Complete root cause and action items",
      ROOT_CAUSE_AND_ACTIONS,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the postmortem draft",
      [
        "1. Read the full postmortem: impact, timeline, root cause, and actions.",
        "2. Request edits if tone, facts, or follow-ups need changes.",
        "3. Reply approve when the doc is ready to share internally.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
