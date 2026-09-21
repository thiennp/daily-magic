import { describeInvalidWorkflowDraftField } from "@/features/workflows/describeInvalidWorkflowDraftField";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";

export const findWorkflowDraftFieldError = (
  fields: readonly DraftWorkflowField[],
): string | null =>
  fields
    .filter((field) => field.label.trim().length > 0)
    .map(describeInvalidWorkflowDraftField)
    .find((message) => message !== null) ?? null;
