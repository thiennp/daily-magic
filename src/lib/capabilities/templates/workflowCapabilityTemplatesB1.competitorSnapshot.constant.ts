import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { COMPETITOR_SNAPSHOT_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowB1.competitorSnapshot.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const COMPETITOR_SNAPSHOT_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "competitor-snapshot",
    "Research",
    "Competitor snapshot",
    "Capture how a competitor compares on what matters to you — clarify evidence gaps, then positioning, strengths/weaknesses vs your lens, and strategy implications you approve before sharing.",
    COMPETITOR_SNAPSHOT_EXAMPLE_REQUEST,
    [
      ["competitor", "Competitor", "text"],
      ["focus", "What we care about", "textarea"],
      ["format", "Output format (optional)", "text", false],
    ],
  );
