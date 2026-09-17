import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const NORMALIZE_AND_CLARIFY = `Read sprintName, shipped, missed, and nextFocus from the workflow form.

## Normalize inputs (this step only)
- Align shipped bullets to sprintName; drop duplicates and internal-only jargon where possible.
- For each missed or deferred item, infer a cause category: scope, risk, or dependency.
- If shipped, deferrals, or nextFocus are thin or ambiguous, ask focused clarifying questions in everyday language.
- Summarize questions and a short fact table in [[PROGRESS]]; the operator answers at the next checkpoint.
- Do not draft the final recap yet and do not use [[AWAITING_INPUT]] for workflow gates.`;

const DRAFT_RECAP = `Continue from prior operator answers (see checkpoint responses above).

## Draft stakeholder recap (this step only)
Write a concise recap suitable for email or Confluence with exactly these sections:
- **Shipped** — user-visible outcomes first; tie items to sprintName where helpful.
- **Deferred** — one line per item with cause category (scope, risk, dependency); no blame.
- **Next focus** — at most three actionable priorities for the coming sprint.

Use stakeholder-safe, factual tone. Lead with outcomes, not activity lists.
Summarize the draft in [[PROGRESS]] and stop before the operator shares it — the workflow pauses for review.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "sprint-recap",
  version: 2,
  capabilityName: "Sprint recap",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm sprint facts and audience",
      [
        "1. Check sprintName, shipped, missed, and nextFocus match what you will report.",
        "2. Note whether you will paste into email, chat, or Confluence.",
        "3. Reply ready when the inputs are accurate enough to draft.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Normalize lists and surface gaps",
      NORMALIZE_AND_CLARIFY,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer gaps or confirm deferral reasons",
      [
        "1. Answer the agent’s questions in plain language.",
        "2. Give one-line cause per deferred item (scope, risk, or dependency).",
        "3. Reply when facts are complete enough to write the recap.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(1, "Draft stakeholder recap", DRAFT_RECAP),
    buildOfficialWorkflowHumanNode(
      2,
      "Review before you share",
      [
        "1. Read the Shipped / Deferred / Next focus draft for tone and accuracy.",
        "2. Ask for edits if anything is blameful, vague, or missing context.",
        "3. Reply approve when you are ready to paste or send it yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
