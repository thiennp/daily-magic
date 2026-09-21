import type { CapabilityHarnessItemPayload } from "@/features/capabilities/hooks/useCapabilityHarnessDraft";
import { buildWorkflowFieldsFromDrafts } from "@/features/workflows/buildWorkflowFieldsFromDrafts";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";
import type WorkflowCreateDraftRecord from "@/features/workflows/types/WorkflowCreateDraftRecord.type";
import { WORKFLOW_CREATE_DRAFT_DEFAULT_NAME } from "@/features/workflows/workflowCreateDraft.constants";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { mapHarnessItemsToOperatorSteps } from "@/lib/harness/partitionHarnessItemsByAudience";
import { buildWorkflowFieldValidationErrors } from "@/lib/workflows/buildWorkflowFieldValidationErrors";

export type BuildWorkflowCreateDraftRecordResult =
  | { readonly ok: true; readonly record: WorkflowCreateDraftRecord }
  | { readonly ok: false; readonly errorMessage: string };

export const buildWorkflowCreateDraftRecord = (input: {
  readonly name: string;
  readonly exampleRequest: string;
  readonly draftFields: readonly DraftWorkflowField[];
  readonly harnessReadyItems: readonly CapabilityHarnessItemPayload[];
  readonly trialFieldValues: Readonly<Record<string, string>>;
}): BuildWorkflowCreateDraftRecordResult => {
  const workflowFields = buildWorkflowFieldsFromDrafts(input.draftFields);
  if (workflowFields.length === 0) {
    return {
      ok: false,
      errorMessage:
        "Add at least one question with a label to try this workflow.",
    };
  }

  const fieldErrors = buildWorkflowFieldValidationErrors(
    workflowFields,
    input.trialFieldValues,
  );
  const validationMessages = Object.values(fieldErrors);
  if (validationMessages.length > 0) {
    return {
      ok: false,
      errorMessage: validationMessages[0] ?? "Fix the trial answers first.",
    };
  }

  const trimmedName = input.name.trim();
  const operatorSteps = mapHarnessItemsToOperatorSteps(input.harnessReadyItems);

  return {
    ok: true,
    record: {
      version: 1,
      name:
        trimmedName.length > 0
          ? trimmedName
          : WORKFLOW_CREATE_DRAFT_DEFAULT_NAME,
      type: CapabilityType.WORKFLOW,
      exampleRequest: input.exampleRequest.trim(),
      workflowFields,
      operatorSteps,
      trialFieldValues: { ...input.trialFieldValues },
    },
  };
};
