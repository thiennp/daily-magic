import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export const SAMPLE_WORKFLOW_CAPABILITY_NAME = "Sample: Weekly status update";

export const SAMPLE_WORKFLOW_DESCRIPTION =
  "A starter workflow with form fields that assemble into one prompt. Edit the fields, rename it, or delete it once you know the pattern.";

export const SAMPLE_WORKFLOW_EXAMPLE_REQUEST =
  "Draft my weekly team status update.";

export const SAMPLE_WORKFLOW_FIELDS: readonly WorkflowFieldDefinition[] = [
  {
    key: "weekOf",
    label: "Week of",
    type: WorkflowFieldInputType.TEXT,
    required: true,
  },
  {
    key: "highlights",
    label: "Highlights",
    type: WorkflowFieldInputType.TEXTAREA,
    required: true,
  },
  {
    key: "blockers",
    label: "Blockers (optional)",
    type: WorkflowFieldInputType.TEXTAREA,
    required: false,
  },
];
