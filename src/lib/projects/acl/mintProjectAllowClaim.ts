import { createHmac, timingSafeEqual } from "node:crypto";

import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";

export const PROJECT_ALLOW_CLAIM_TTL_SECONDS = 300;
export const PROJECT_ALLOW_CLAIM_PREFIX = "awcacl1.";

const readAuthSecret = (): string | null => {
  const secret = process.env.AUTH_SECRET?.trim();
  return secret && secret.length > 0 ? secret : null;
};

const signPayload = (payload: string, secret: string): string =>
  createHmac("sha256", secret).update(payload).digest("base64url");

export type MintProjectAllowClaimResult =
  | {
      readonly ok: true;
      readonly allowClaim: string;
      readonly expiresAt: string;
      readonly projectId: string;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "misconfigured";
    };

/** Short-lived ACL claim. Validation always re-checks membership. */
export const mintProjectAllowClaim = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<MintProjectAllowClaimResult> => {
  const access = await resolveProjectAclAccess({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    requiredScopes: ["peer_sync"],
  });
  if (!access.ok) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "forbidden",
    };
  }

  const secret = readAuthSecret();
  if (secret === null) {
    return { ok: false, code: "misconfigured" };
  }

  const expiresUnix =
    Math.floor(Date.now() / 1000) + PROJECT_ALLOW_CLAIM_TTL_SECONDS;
  const body = `${input.projectId}.${input.actorUserId}.${String(expiresUnix)}`;
  const sig = signPayload(body, secret);
  return {
    ok: true,
    allowClaim: `${PROJECT_ALLOW_CLAIM_PREFIX}${body}.${sig}`,
    expiresAt: new Date(expiresUnix * 1000).toISOString(),
    projectId: input.projectId,
  };
};

export const parseProjectAllowClaimParts = (
  allowClaim: string,
): {
  readonly projectId: string;
  readonly userId: string;
  readonly expiresUnix: number;
  readonly signature: string;
} | null => {
  if (!allowClaim.startsWith(PROJECT_ALLOW_CLAIM_PREFIX)) {
    return null;
  }
  const rest = allowClaim.slice(PROJECT_ALLOW_CLAIM_PREFIX.length);
  const parts = rest.split(".");
  if (parts.length !== 4) {
    return null;
  }
  const expiresUnix = Number(parts[2]);
  if (!Number.isFinite(expiresUnix)) {
    return null;
  }
  return {
    projectId: parts[0],
    userId: parts[1],
    expiresUnix,
    signature: parts[3],
  };
};

export const signaturesMatch = (expected: string, actual: string): boolean => {
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(actual));
  } catch {
    return false;
  }
};

export { readAuthSecret, signPayload };
