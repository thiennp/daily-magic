import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import type DraftWorkflowField from "@/features/workflows/types/DraftWorkflowField.type";

export const describeInvalidWorkflowDraftField = (
  draft: DraftWorkflowField,
): string | null => {
  if (draft.type !== WorkflowFieldInputType.SELECT) {
    return null;
  }

  const choices = [
    ...new Set(draft.options.map((option) => option.trim()).filter(Boolean)),
  ];
  if (choices.length >= 2) {
    return null;
  }

  const label = draft.label.trim();
  const title = label.length > 0 ? label : "This choice list";
  return `${title} needs at least two choices.`;
};
