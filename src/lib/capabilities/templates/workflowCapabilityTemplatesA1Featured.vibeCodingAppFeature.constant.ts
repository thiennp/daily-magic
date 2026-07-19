import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.vibeCodingAppFeature.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const VIBE_CODING_APP_FEATURE_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "vibe-coding-app-feature",
    "Engineering",
    "Add vibe coding app feature",
    "Turn a vibe brief into a small app feature on your Mac — clarify first, decide architecture in plain language, then ship with knowledge and tests.",
    VIBE_CODING_APP_FEATURE_EXAMPLE_REQUEST,
    [
      [
        "appTarget",
        "App folder path or local app name (optional)",
        "text",
        false,
      ],
      ["featureBrief", "Feature vibe and outcome", "textarea"],
      ["targetSurface", "Where it lives (route, screen, or component)", "text"],
      [
        "stackNotes",
        "Stack or pattern constraints (optional)",
        "textarea",
        false,
      ],
      ["acceptanceNotes", "Done-when checklist (optional)", "textarea", false],
    ],
  );
