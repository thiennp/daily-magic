import path from "node:path";

export const resolveWorkflowUploadRootDir = (): string => {
  const configured = process.env.WORKFLOW_UPLOAD_DIR?.trim();
  if (configured !== undefined && configured.length > 0) {
    return configured;
  }

  return path.join(process.cwd(), ".data", "workflow-uploads");
};

export const buildWorkflowUploadStoragePath = (sha256: string): string => {
  const normalized = sha256.trim().toLowerCase();
  return path.join(normalized.slice(0, 2), normalized);
};
