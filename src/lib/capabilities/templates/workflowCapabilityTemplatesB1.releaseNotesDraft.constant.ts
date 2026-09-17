import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.releaseNotesDraft.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const RELEASE_NOTES_DRAFT_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "release-notes-draft",
    "Engineering",
    "Release notes draft",
    "Turn a raw change list into customer-ready release notes — cluster by impact, draft for your audience, then approve before publish.",
    RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST,
    [
      ["version", "Version", "text"],
      ["changes", "Changes", "textarea"],
      ["audience", "Audience", "text"],
    ],
  );
