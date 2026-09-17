import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { BUG_REPORT_WRITER_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.bugReportWriter.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const BUG_REPORT_WRITER_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "bug-report-writer",
    "Engineering",
    "Bug report writer",
    "Turn a rough repro into a clear bug ticket — minimize steps, clarify environment gaps, then draft markdown you approve before filing.",
    BUG_REPORT_WRITER_EXAMPLE_REQUEST,
    [
      ["summary", "What happened", "textarea"],
      ["steps", "Steps to reproduce", "textarea"],
      ["expectedActual", "Expected vs actual", "textarea"],
      ["severity", "Severity", "text"],
    ],
  );
