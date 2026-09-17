import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const CLUSTER_AND_PRIORITIZE = `Read version, changes, and audience from the workflow form.

## Cluster and prioritize (this step only)
Group items by user-visible impact — not by internal component or ticket bucket.
Call out breaking changes, migrations, and required operator actions first.
Drop internal ticket IDs unless they help the reader.
Summarize open questions about grouping or severity in [[PROGRESS]] for the next checkpoint.
Do not write final publish-ready copy yet.`;

const DRAFT_CUSTOMER_NOTES = `Continue from prior operator answers (see checkpoint responses above).

## Draft customer-ready notes (this step only)
Produce a versioned release notes draft with clear sections (for example Features, Fixes, Breaking).
Keep sentences short; explain why each item matters when helpful.
Match the audience field tone; thank contributors only if named in changes.
The workflow will pause for final approval — do not assume publish.`;

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "release-notes-draft",
  version: 2,
  capabilityName: "Release notes draft",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm version, audience, and change list",
      [
        "1. Check version matches the release you are shipping.",
        "2. Paste or refine changes so each item is understandable without internal jargon.",
        "3. Set audience (customers, internal, partners) and reply ready when inputs look complete.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      0,
      "Cluster changes and surface breaking items",
      CLUSTER_AND_PRIORITIZE,
    ),
    buildOfficialWorkflowHumanNode(
      1,
      "Review grouping, breaking changes, and tone",
      [
        "1. Read how the agent clustered items and surfaced breaking changes.",
        "2. Say what to rename, merge, split, or drop from the outline.",
        "3. Reply when grouping and tone feel right for your audience.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      1,
      "Draft customer-ready release notes",
      DRAFT_CUSTOMER_NOTES,
    ),
    buildOfficialWorkflowHumanNode(
      2,
      "Approve release notes before you publish",
      [
        "1. Read the final draft for accuracy against the real change list.",
        "2. Ask for edits if anything is missing, too technical, or over-promises.",
        "3. Reply approve when the notes are ready for changelog, email, or in-app modal.",
      ].join("\n"),
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
