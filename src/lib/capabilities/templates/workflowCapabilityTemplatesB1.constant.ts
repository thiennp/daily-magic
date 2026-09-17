import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { COMPARE_OPTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.compareOptions.exampleRequest";
import { COMPETITOR_SNAPSHOT_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.competitorSnapshot.constant";
import { BUG_REPORT_WRITER_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.bugReportWriter.constant";
import { PR_SUMMARY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.prSummary.constant";
import { RELEASE_NOTES_DRAFT_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.releaseNotesDraft.constant";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const WORKFLOW_CAPABILITY_TEMPLATES_B1: readonly WorkflowCapabilityTemplate[] =
  [
    buildWorkflowTemplate(
      "compare-options",
      "Research",
      "Compare options",
      "Score two paths against your criteria and get a clear recommendation — clarify weights first, then review the table before you decide.",
      COMPARE_OPTIONS_EXAMPLE_REQUEST,
      [
        ["optionA", "Option A", "textarea"],
        ["optionB", "Option B", "textarea"],
        ["criteria", "Criteria", "textarea"],
      ],
    ),
    COMPETITOR_SNAPSHOT_WORKFLOW,
    PR_SUMMARY_WORKFLOW,
    BUG_REPORT_WRITER_WORKFLOW,
    RELEASE_NOTES_DRAFT_WORKFLOW,
  ];
