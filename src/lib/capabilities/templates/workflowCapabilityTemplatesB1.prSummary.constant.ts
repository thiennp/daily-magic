import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { PR_SUMMARY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.prSummary.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const PR_SUMMARY_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "pr-summary",
    "Engineering",
    "PR / code change summary",
    "Turn a branch or diff into a reviewer-ready summary — risks, mitigations, and verification notes tuned to your audience.",
    PR_SUMMARY_EXAMPLE_REQUEST,
    [
      ["context", "PR title, branch, or link context", "text"],
      ["change", "What changed and why", "textarea"],
      ["audience", "Who will read this (reviewers, PM, etc.)", "text"],
      ["testNotes", "How you tested (optional)", "textarea", false],
    ],
  );
