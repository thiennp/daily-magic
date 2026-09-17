import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { COMPARE_OPTIONS_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.compareOptions.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { PR_SUMMARY_WORKFLOW } from "@/lib/capabilities/templates/workflowCapabilityTemplatesB1.prSummary.constant";

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
    PR_SUMMARY_WORKFLOW,

    buildWorkflowTemplate(
      "bug-report-writer",
      "Engineering",
      "Bug report writer",
      "Turn a rough repro into a clear bug ticket.",
      "Write a bug report with repro steps, expected vs actual, and severity.",
      [
        ["summary", "What happened", "textarea"],
        ["steps", "Steps to reproduce", "textarea"],
        ["expectedActual", "Expected vs actual", "textarea"],
        ["severity", "Severity", "text"],
      ],
    ),
    buildWorkflowTemplate(
      "release-notes-draft",
      "Engineering",
      "Release notes draft",
      "Turn a change list into customer-ready release notes.",
      "Draft release notes grouped by user impact. Keep language plain.",
      [
        ["version", "Version", "text"],
        ["changes", "Changes", "textarea"],
        ["audience", "Audience", "text"],
      ],
    ),
  ];
