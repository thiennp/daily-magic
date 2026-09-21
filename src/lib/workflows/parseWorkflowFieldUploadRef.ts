import { WORKFLOW_FIELD_UPLOAD_REF_PREFIX } from "@/lib/workflows/workflowFieldUploadRef.constant";

export const parseWorkflowFieldUploadRef = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed.startsWith(WORKFLOW_FIELD_UPLOAD_REF_PREFIX)) {
    return null;
  }

  const uploadId = trimmed
    .slice(WORKFLOW_FIELD_UPLOAD_REF_PREFIX.length)
    .trim();
  return uploadId.length > 0 ? uploadId : null;
};

export const isWorkflowFieldUploadRef = (value: string): boolean =>
  parseWorkflowFieldUploadRef(value) !== null;
