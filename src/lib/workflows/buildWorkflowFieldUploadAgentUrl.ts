import { resolveAppBaseUrl } from "@/lib/app/resolveAppBaseUrl";
import {
  WORKFLOW_FIELD_UPLOAD_AGENT_ACCESS_TTL_SECONDS,
  signWorkflowFieldUploadAgentAccess,
} from "@/lib/workflows/signWorkflowFieldUploadAgentAccess";

export function buildWorkflowFieldUploadAgentUrl(input: {
  readonly uploadId: string;
  readonly ownerUserId: string;
}): string | null {
  const expiresUnix =
    Math.floor(Date.now() / 1000) +
    WORKFLOW_FIELD_UPLOAD_AGENT_ACCESS_TTL_SECONDS;
  const sig = signWorkflowFieldUploadAgentAccess({
    uploadId: input.uploadId,
    ownerUserId: input.ownerUserId,
    expiresUnix,
  });

  if (sig === null) {
    return null;
  }

  const base = resolveAppBaseUrl();
  const params = new URLSearchParams({
    uploadId: input.uploadId,
    expires: String(expiresUnix),
    sig,
  });

  return `${base}/api/workflows/field-uploads/agent?${params.toString()}`;
}
