export const WORKFLOW_FIELD_FILE_ACCEPT = {
  PDF: "pdf",
  IMAGE: "image",
} as const;

export type WorkflowFieldFileAcceptValue =
  (typeof WORKFLOW_FIELD_FILE_ACCEPT)[keyof typeof WORKFLOW_FIELD_FILE_ACCEPT];

export const WORKFLOW_FIELD_FILE_ACCEPT_VALUES = [
  WORKFLOW_FIELD_FILE_ACCEPT.PDF,
  WORKFLOW_FIELD_FILE_ACCEPT.IMAGE,
] as const;

export const WORKFLOW_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;

export const WORKFLOW_UPLOAD_PDF_MIME = "application/pdf" as const;

export const WORKFLOW_UPLOAD_IMAGE_MIMES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
] as const;
