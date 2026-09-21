import type { WorkflowFieldInputTypeValue } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

export const workflowFieldHtmlInputType = (
  type: WorkflowFieldInputTypeValue,
): "text" | "number" | "tel" | "email" | "url" | "date" | null => {
  if (type === WorkflowFieldInputType.NUMBER) {
    return "number";
  }
  if (type === WorkflowFieldInputType.PHONE) {
    return "tel";
  }
  if (type === WorkflowFieldInputType.EMAIL) {
    return "email";
  }
  if (type === WorkflowFieldInputType.URL) {
    return "url";
  }
  if (type === WorkflowFieldInputType.DATE) {
    return "date";
  }
  if (type === WorkflowFieldInputType.TEXT) {
    return "text";
  }
  return null;
};
