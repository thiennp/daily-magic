import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const MINIMIZE_REPRO_AND_CLARIFY = `Read summary, steps, expectedActual, and severity from the workflow form.

## Minimize repro (this step only)
Turn the rough steps into the smallest numbered list that still reproduces the bug.
Call out missing environment hints (browser, OS, app version, account type) in [[PROGRESS]].
Note attachments or logs mentioned in the form; do not invent data.

## Clarify before drafting
List only the questions you still need answered to write a triage-ready ticket.
Use plain language. Do not draft the final bug report yet and do not edit product code.`;

const DRAFT_BUG_REPORT = `Continue from the operator’s clarifications at the checkpoints above.

## Draft ticket (this step only)
Write a triage-ready bug report in markdown suitable for Jira or GitHub issues:
- **Title** — scannable summary from the form
- **Environment** — only what is known (say unknown when not provided)
- **Steps to reproduce** — numbered, minimal list from prior work
- **Expected** / **Actual** — unambiguous, pulled from expectedActual when present
- **Severity** — label plus one line tying impact to users or delivery
- **Attachments / logs** — section only when the operator mentioned files or paste

Put the full draft in [[PROGRESS]]. Stop before filing — the workflow pauses for operator review.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "bug-report-writer",
  version: 2,
  capabilityName: "Bug report writer",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm repro details in the workflow form",
      [
        "1. Check summary, steps, expected vs actual, and severity in the form.",
        "2. Paste logs or screenshots into the steps field if you have them.",
        "3. Reply ready when the rough repro is complete enough to tighten.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Minimize repro and list clarifying questions",
      MINIMIZE_REPRO_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Fill gaps the agent flagged",
      [
        "1. Answer environment questions (browser, OS, account, build).",
        "2. Say how often it happens and whether it blocks work.",
        "3. Reply when clarifications are done.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft the bug report markdown",
      DRAFT_BUG_REPORT,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the ticket before you file it",
      [
        "1. Read the drafted title, repro, expected/actual, and severity.",
        "2. Ask for edits if steps are unclear or severity feels wrong.",
        "3. Reply approve when the ticket is ready to paste into your tracker.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
