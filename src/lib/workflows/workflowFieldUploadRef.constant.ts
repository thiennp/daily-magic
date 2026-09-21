export const WORKFLOW_FIELD_UPLOAD_REF_PREFIX = "aw-upload:" as const;

export const buildWorkflowFieldUploadRef = (uploadId: string): string =>
  `${WORKFLOW_FIELD_UPLOAD_REF_PREFIX}${uploadId.trim()}`;
