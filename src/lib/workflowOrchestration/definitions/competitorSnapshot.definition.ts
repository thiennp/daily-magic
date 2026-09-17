import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const SCOPE_AND_EVIDENCE = `Read competitor, focus, and format from the workflow form.
If format is empty, default to: positioning paragraph, strengths/weaknesses vs focus, strategy implications, and watch items.

## Scope and evidence (this step only)
Confirm which company or product we are comparing.
Apply the focus lens throughout — not a generic SWOT.
Separate verified facts from market rumor or inference; call out evidence gaps explicitly.

List only the clarifications you still need in [[PROGRESS]] — the operator answers at the next human checkpoint.
Do not write the final snapshot in this step.`;

const DRAFT_SNAPSHOT = `Continue from prior operator answers (see checkpoint responses above).

## Draft the competitor snapshot (this step only)
Respect the optional format field when set; otherwise use the default structure.

Include:
- Positioning in one paragraph (how they win today)
- Strengths and weaknesses relative to focus
- So-what implications for our strategy (not theirs)
- Watch items and open evidence gaps

Stop before final operator review — they approve before sharing internally.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "competitor-snapshot",
  version: 2,
  capabilityName: "Competitor snapshot",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm competitor, focus lens, and output format",
      [
        "1. Check competitor names the right company or product.",
        "2. Confirm focus states what we care about (not a generic SWOT).",
        "3. Set format if empty (e.g. exec brief, battlecard, slide bullets).",
        "4. Reply ready when inputs are good to continue.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Scope competitor and surface evidence gaps",
      SCOPE_AND_EVIDENCE,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Answer evidence and scope questions",
      [
        "1. Answer the agent’s clarification questions in plain language.",
        "2. Share links, docs, or firsthand context the agent cannot infer.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft positioning, comparison, and implications",
      DRAFT_SNAPSHOT,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Review the snapshot before you share",
      [
        "1. Read positioning, strengths/weaknesses vs focus, and implications.",
        "2. Ask for edits if facts feel unverified or implications are off.",
        "3. Reply approve when you are ready to share the snapshot yourself.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
