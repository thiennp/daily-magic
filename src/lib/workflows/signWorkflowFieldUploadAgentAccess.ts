import { createHmac, timingSafeEqual } from "node:crypto";

export const WORKFLOW_FIELD_UPLOAD_AGENT_ACCESS_TTL_SECONDS = 86_400;

const readAuthSecret = (): string | null => {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret && secret.length > 0 ? secret : null;
};

export function signWorkflowFieldUploadAgentAccess(input: {
  readonly uploadId: string;
  readonly ownerUserId: string;
  readonly expiresUnix: number;
}): string | null {
  const secret = readAuthSecret();
  if (secret === null) {
    return null;
  }

  return createHmac("sha256", secret)
    .update(
      `${input.uploadId}:${input.ownerUserId}:${String(input.expiresUnix)}`,
    )
    .digest("base64url");
}

export function verifyWorkflowFieldUploadAgentAccess(input: {
  readonly uploadId: string;
  readonly ownerUserId: string;
  readonly expiresUnix: number;
  readonly signature: string;
}): boolean {
  if (input.expiresUnix < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const expected = signWorkflowFieldUploadAgentAccess({
    uploadId: input.uploadId,
    ownerUserId: input.ownerUserId,
    expiresUnix: input.expiresUnix,
  });

  if (expected === null || input.signature.length === 0) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(input.signature));
  } catch {
    return false;
  }
}
