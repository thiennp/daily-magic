import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { expandWorkflowFieldUploadRefs } from "@/lib/workflows/expandWorkflowFieldUploadRefs";
import {
  buildWorkflowPrompt,
  validateWorkflowFieldValues,
} from "@/lib/workflows/buildWorkflowPrompt";

export const buildAutomationDispatchPrompt = (
  capability: PublishedCapabilityRecord,
  fieldValues: Readonly<Record<string, string>>,
): string =>
  buildWorkflowPrompt(
    capability.name,
    capability.workflowFields,
    fieldValues,
    capability.exampleRequest,
  );

export const buildAutomationDispatchPromptAsync = async (
  capability: PublishedCapabilityRecord,
  fieldValues: Readonly<Record<string, string>>,
): Promise<string> => {
  const expanded = await expandWorkflowFieldUploadRefs({
    ownerUserId: capability.ownerUserId,
    fields: capability.workflowFields,
    values: fieldValues,
  });

  return buildAutomationDispatchPrompt(capability, expanded);
};

export const readAutomationFieldValidationErrors = (
  capability: PublishedCapabilityRecord,
  fieldValues: Readonly<Record<string, string>>,
): readonly string[] =>
  validateWorkflowFieldValues(capability.workflowFields, fieldValues);
