import { isValidWorkflowBooleanValue } from "@/lib/workflows/isValidWorkflowBooleanValue";
import { isValidWorkflowDateValue } from "@/lib/workflows/isValidWorkflowDateValue";
import { isValidWorkflowEmailValue } from "@/lib/workflows/isValidWorkflowEmailValue";
import { isValidWorkflowNumberValue } from "@/lib/workflows/isValidWorkflowNumberValue";
import { isValidWorkflowPhoneValue } from "@/lib/workflows/isValidWorkflowPhoneValue";
import { isValidWorkflowUrlValue } from "@/lib/workflows/isValidWorkflowUrlValue";
import { isWorkflowFieldUploadRef } from "@/lib/workflows/parseWorkflowFieldUploadRef";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const formatTypeError = (label: string, expected: string): string =>
  `${label} must be ${expected}.`;

export const validateWorkflowFieldValue = (
  field: WorkflowFieldDefinition,
  rawValue: string | undefined,
): string | null => {
  const value = rawValue?.trim() ?? "";
  if (value.length === 0) {
    return field.required ? `${field.label} is required.` : null;
  }

  if (
    field.type === WorkflowFieldInputType.NUMBER &&
    !isValidWorkflowNumberValue(value)
  ) {
    return formatTypeError(field.label, "a number");
  }

  if (
    field.type === WorkflowFieldInputType.PHONE &&
    !isValidWorkflowPhoneValue(value)
  ) {
    return formatTypeError(field.label, "a phone number");
  }

  if (
    field.type === WorkflowFieldInputType.EMAIL &&
    !isValidWorkflowEmailValue(value)
  ) {
    return formatTypeError(field.label, "an email address");
  }

  if (
    field.type === WorkflowFieldInputType.URL &&
    !isValidWorkflowUrlValue(value)
  ) {
    return formatTypeError(field.label, "a link");
  }

  if (
    field.type === WorkflowFieldInputType.DATE &&
    !isValidWorkflowDateValue(value)
  ) {
    return formatTypeError(field.label, "a date");
  }

  if (
    field.type === WorkflowFieldInputType.BOOLEAN &&
    !isValidWorkflowBooleanValue(value)
  ) {
    return formatTypeError(field.label, "yes or no");
  }

  if (field.type === WorkflowFieldInputType.SELECT) {
    const options = field.options ?? [];
    if (options.length === 0 || !options.includes(value)) {
      return formatTypeError(field.label, "one of the listed choices");
    }
  }

  if (
    field.type === WorkflowFieldInputType.FILE &&
    !isWorkflowFieldUploadRef(value)
  ) {
    return `${field.label} needs an uploaded file.`;
  }

  return null;
};
