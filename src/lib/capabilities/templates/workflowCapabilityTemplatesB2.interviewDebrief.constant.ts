import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { INTERVIEW_DEBRIEF_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB2.interviewDebrief.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const INTERVIEW_DEBRIEF_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "interview-debrief",
    "HR",
    "Interview debrief",
    "Capture interview signal and a hire / no-hire / hold lean — clarify gaps, then a committee-ready debrief you approve before sharing.",
    INTERVIEW_DEBRIEF_EXAMPLE_REQUEST,
    [
      ["candidate", "Candidate", "text"],
      ["role", "Role", "text"],
      ["strengths", "Strengths", "textarea"],
      ["concerns", "Concerns", "textarea", false],
    ],
  );
