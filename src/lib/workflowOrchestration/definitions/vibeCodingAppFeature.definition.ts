import {
  buildOfficialWorkflowAgentNode,
  buildOfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/definitions/buildOfficialWorkflowDefinitionNodes";
import {
  APPLY_REVIEW_FIXES,
  ARCHITECTURE_AND_OPTIONS,
  IMPLEMENT_SLICE,
  RESOLVE_AND_CLARIFY,
  VERIFY_AND_DOCUMENT,
} from "@/lib/workflowOrchestration/definitions/vibeCodingAppFeature.promptSections";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

const APPROVAL_PHRASES = ["approve", "approved", "no changes", "ship it"];

export const OFFICIAL_WORKFLOW_DEFINITION: OfficialWorkflowDefinition = {
  templateId: "vibe-coding-app-feature",
  version: 3,
  capabilityName: "Add vibe coding app feature",
  nodes: [
    buildOfficialWorkflowHumanNode(
      0,
      "Confirm the vibe, screen, and app folder",
      [
        "1. Check featureBrief and targetSurface feel right.",
        "2. Confirm appTarget points at the app folder you want changed on this Mac.",
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
        "3. Skip this step if the agent did not show a table.",
      ].join("\n"),
      { allowSkip: true },
    ),
    buildOfficialWorkflowAgentNode(2, "Implement the slice", IMPLEMENT_SLICE),
    buildOfficialWorkflowAgentNode(
      3,
      "Tests, knowledge, and summary",
      VERIFY_AND_DOCUMENT,
    ),
    buildOfficialWorkflowHumanNode(
      3,
      "Review the result before you merge",
      [
        "1. Read the summary: what changed, tests, and how to try it.",
        "2. Ask for fixes if something feels wrong — the agent gets one fix pass.",
        "3. Reply approve when you are ready to merge yourself.",
      ].join("\n"),
    ),
    buildOfficialWorkflowAgentNode(
      4,
      "Apply review fixes",
      APPLY_REVIEW_FIXES,
      {
        skipWhenPriorResponseMatches: APPROVAL_PHRASES,
      },
    ),
    buildOfficialWorkflowHumanNode(
      4,
      "Confirm the fixes",
      [
        "1. Check the fix summary against what you asked for.",
        "2. Ask for another run if something is still wrong.",
        "3. Skip this step if you already approved without changes.",
      ].join("\n"),
      { allowSkip: true },
    ),
  ],
};

export default OFFICIAL_WORKFLOW_DEFINITION;
