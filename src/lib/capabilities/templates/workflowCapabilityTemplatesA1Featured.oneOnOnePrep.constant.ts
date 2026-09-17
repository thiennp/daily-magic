import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { ONE_ON_ONE_PREP_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.oneOnOnePrep.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const ONE_ON_ONE_PREP_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "one-on-one-prep",
    "Communication",
    "1:1 talking points",
    "Turn form inputs into a caring, candid 1:1 agenda — clarify first, then draft prompts, feedback, and follow-ups you approve before the meeting.",
    ONE_ON_ONE_PREP_EXAMPLE_REQUEST,
    [
      ["person", "Person", "text"],
      ["sinceLast", "Since last 1:1", "textarea", false],
      ["topics", "Topics to cover", "textarea"],
      ["feedback", "Feedback to share", "textarea", false],
    ],
  );
