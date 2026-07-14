import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

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
