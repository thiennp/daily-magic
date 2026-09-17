import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.releaseNotesDraft.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { BUG_REPORT_WRITER_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.bugReportWriter.constant";

export const WORKFLOW_CAPABILITY_TEMPLATES_B1: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "compare-options",
      "Research",
      "Compare options",
      "Build a pros/cons comparison and recommendation.",
      "Compare the options using the criteria. End with a clear recommendation.",
      [
        ["optionA", "Option A", "textarea"],
        ["optionB", "Option B", "textarea"],
        ["criteria", "Criteria", "textarea"],
      ],
    ),
    buildWorkflowTemplate(
      "competitor-snapshot",
      "Research",
      "Competitor snapshot",
      "Capture how a competitor compares on what matters to you.",
      "Write a competitor snapshot with positioning, strengths, weaknesses, and implications.",
      [
        ["competitor", "Competitor", "text"],
        ["focus", "What we care about", "textarea"],
        ["format", "Output format", "text", false],
      ],
    ),
    buildWorkflowTemplate(
      "pr-summary",
      "Engineering",
      "PR / code change summary",
      "Explain a change for reviewers or non-engineers.",
      "Summarize the change, risk areas, and test notes for reviewers.",
      [
        ["context", "PR / branch context", "text"],
        ["change", "What changed", "textarea"],
        ["audience", "Audience", "text"],
      ],
    ),
    BUG_REPORT_WRITER_WORKFLOW,

    buildWorkflowTemplate(
      "release-notes-draft",
      "Engineering",
      "Release notes draft",
      "Turn a change list into customer-ready release notes.",
      RELEASE_NOTES_DRAFT_EXAMPLE_REQUEST,
      [
        ["version", "Version", "text"],
        ["changes", "Changes", "textarea"],
        ["audience", "Audience", "text"],
      ],
    ),
  ];
