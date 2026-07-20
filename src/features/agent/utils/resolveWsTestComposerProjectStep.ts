import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import { workflowRequiresProjectSelection } from "@/lib/workflows/workflowProjectFields";

export const shouldSkipWsTestComposerProjectStep = (input: {
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly isCustomTask: boolean;
}): boolean =>
  input.isCustomTask || !workflowRequiresProjectSelection(input.workflowFields);

export const shouldAutoCompleteWsTestComposerProjectStep = (input: {
  readonly urlProjectId: string;
  readonly selectedProjectId: string;
  readonly hasRewoundWizard: boolean;
}): boolean =>
  !input.hasRewoundWizard &&
  input.urlProjectId.length > 0 &&
  input.selectedProjectId.length > 0;
