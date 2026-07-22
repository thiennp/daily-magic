/**
 * Legacy helper: workflow PROJECT fields no longer gate the wizard step
 * (AGENT-045 always shows project after Mac). Kept for callers that still
 * ask whether a workflow template needs a folder applied.
 */
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { workflowRequiresProjectSelection } from "@/lib/workflows/workflowProjectFields";

export const shouldSkipWsTestComposerProjectStep = (input: {
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly isCustomTask: boolean;
}): boolean =>
  input.isCustomTask || !workflowRequiresProjectSelection(input.workflowFields);

export const shouldAutoCompleteWsTestComposerProjectStep = (input: {
  readonly selectedProjectId: string;
  readonly hasRewoundWizard: boolean;
}): boolean => !input.hasRewoundWizard && input.selectedProjectId.length > 0;
