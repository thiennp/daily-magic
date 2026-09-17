import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const VALIDATE_STANDUP_INPUTS = `Read yesterday, today, and blockers from the workflow form.

## Validate (this step only)
Confirm yesterday and today are concrete enough for async chat (outcomes and verbs, not “worked on stuff”).
If blockers is empty, only infer a blocker when today or yesterday clearly implies one; otherwise plan to use “None” or ask one focused question.
List any gaps or follow-ups in [[PROGRESS]] in everyday language.
Do not write the final paste-ready standup in this step.`;

const FORMAT_STANDUP_DRAFT = `Continue from prior operator answers (see checkpoint responses above).

## Format (this step only)
Produce a paste-ready async standup with three labeled sections:
- **Yesterday** — completed work only (1–3 bullets).
- **Today** — planned commitments with clear verbs (1–3 bullets).
- **Blockers** — specific dependency, decision, or owner — or **None**.

Target 80–120 words total; no filler or repeating the section headings in prose.
Put the full draft in [[PROGRESS]] for operator review — they paste after the final checkpoint.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "daily-standup",
  version: 2,
  capabilityName: "Daily standup",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm yesterday, today, and blockers",
      [
        "1. Check yesterday and today capture real work — verbs and outcomes, not vague status.",
        "2. Add blockers even if the field was empty but something is blocking you.",
        "3. Reply ready when the form matches what you would say in standup.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Validate standup inputs",
      VALIDATE_STANDUP_INPUTS,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Fill in any gaps the agent flagged",
      [
        "1. Answer the agent’s follow-ups in plain language.",
        "2. Say skip if nothing was missing and you want the draft now.",
        "3. Reply when clarifications are done.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Format async standup draft",
      FORMAT_STANDUP_DRAFT,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the standup before you paste",
      [
        "1. Read the Yesterday / Today / Blockers draft (target 80–120 words).",
        "2. Ask for a tighter or clearer rewrite if needed.",
        "3. Reply approve when you are ready to paste into chat.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
