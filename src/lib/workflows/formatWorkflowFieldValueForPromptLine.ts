import { parseWorkflowFieldUploadRef } from "@/lib/workflows/parseWorkflowFieldUploadRef";
import { buildWorkflowFieldUploadRef } from "@/lib/workflows/workflowFieldUploadRef.constant";

export const formatWorkflowFieldValueForPromptLine = (
  value: string,
  excerptByUploadId?: Readonly<Record<string, string>>,
): string => {
  const uploadId = parseWorkflowFieldUploadRef(value);
  if (uploadId === null) {
    return value;
  }

  const excerpt = excerptByUploadId?.[uploadId]?.trim();
  if (excerpt !== undefined && excerpt.length > 0) {
    return excerpt;
  }

  return `(uploaded file ${uploadId})`;
};

export { buildWorkflowFieldUploadRef };
