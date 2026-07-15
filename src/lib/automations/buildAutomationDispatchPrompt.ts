import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
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

export const readAutomationFieldValidationErrors = (
  capability: PublishedCapabilityRecord,
  fieldValues: Readonly<Record<string, string>>,
): readonly string[] =>
  validateWorkflowFieldValues(capability.workflowFields, fieldValues);
