import {
  parseProjectAllowClaimParts,
  readAuthSecret,
  signPayload,
  signaturesMatch,
} from "@/lib/projects/acl/mintProjectAllowClaim";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";

export type VerifyProjectAllowClaimResult =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly userId: string;
    }
  | {
      readonly ok: false;
      readonly code: "invalid" | "expired" | "revoked" | "misconfigured";
    };

/**
 * Revoke-aware: signature + exp are not enough — membership is re-checked.
 */
export const verifyProjectAllowClaim = async (
  allowClaim: string,
): Promise<VerifyProjectAllowClaimResult> => {
  const parts = parseProjectAllowClaimParts(allowClaim);
  if (parts === null) {
    return { ok: false, code: "invalid" };
  }
  if (parts.expiresUnix < Math.floor(Date.now() / 1000)) {
    return { ok: false, code: "expired" };
  }

  const secret = readAuthSecret();
  if (secret === null) {
    return { ok: false, code: "misconfigured" };
  }

  const body = `${parts.projectId}.${parts.userId}.${String(parts.expiresUnix)}`;
  const expected = signPayload(body, secret);
  if (!signaturesMatch(expected, parts.signature)) {
    return { ok: false, code: "invalid" };
  }

  const access = await resolveProjectAclAccess({
    projectId: parts.projectId,
    actorUserId: parts.userId,
    requiredScopes: ["peer_sync"],
  });
  if (!access.ok) {
    return { ok: false, code: "revoked" };
  }

  return {
    ok: true,
    projectId: parts.projectId,
    userId: parts.userId,
  };
};
