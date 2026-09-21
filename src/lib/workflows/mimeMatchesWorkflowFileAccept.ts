import type { WorkflowFieldFileAcceptValue } from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";
import {
  WORKFLOW_UPLOAD_IMAGE_MIMES,
  WORKFLOW_UPLOAD_PDF_MIME,
} from "@/lib/workflows/types/WorkflowFieldFileAccept.constant";

export const mimeMatchesWorkflowFileAccept = (
  mimeType: string,
  accept: readonly WorkflowFieldFileAcceptValue[],
): boolean => {
  const normalized = mimeType.trim().toLowerCase();
  const wantsPdf = accept.includes("pdf");
  const wantsImage = accept.includes("image");

  if (wantsPdf && normalized === WORKFLOW_UPLOAD_PDF_MIME) {
    return true;
  }

  if (
    wantsImage &&
    WORKFLOW_UPLOAD_IMAGE_MIMES.some((mime) => mime === normalized)
  ) {
    return true;
  }

  return accept.length === 0;
};

export const defaultWorkflowFileAccept =
  (): readonly WorkflowFieldFileAcceptValue[] => ["pdf", "image"];
