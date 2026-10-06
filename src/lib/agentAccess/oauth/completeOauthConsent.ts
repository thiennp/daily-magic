import { issueOwnedAgentAccessCredential } from "@/lib/agentAccess/issueOwnedAgentAccessCredential";
import type { CompleteOauthConsentResult } from "@/lib/agentAccess/oauth/CompleteOauthConsentResult.type";
import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { issueOauthAuthCodeAfterConsent } from "@/lib/agentAccess/oauth/issueOauthAuthCodeAfterConsent";
import { loadOauthPending } from "@/lib/agentAccess/oauth/loadOauthPending";
import { requireAwcTermsAcceptance } from "@/lib/agentAccess/requireAwcTermsAcceptance";
import { getSql } from "@/lib/db";

export type { CompleteOauthConsentResult };

/**
 * Consent Approve: creates ACCOUNT + owner_user_id ONLY, issues one-time auth code.
 * Never grants project membership.
 */
export const completeOauthConsent = async (input: {
  readonly pendingId: string;
  readonly ownerUserId: string;
  readonly decision: "approve" | "deny";
  readonly acceptTerms?: unknown;
  readonly termsVersion?: unknown;
  readonly nowMs?: number;
}): Promise<CompleteOauthConsentResult> => {
  const pending = await loadOauthPending({
    pendingId: input.pendingId,
    nowMs: input.nowMs,
  });
  if (pending === null) {
    return {
      ok: false,
      status: 400,
      code: "invalid_request",
      error: "This link expired. Start again from your assistant.",
    };
  }

  const sql = getSql();
  const nowMs = input.nowMs ?? Date.now();

  if (input.decision === "deny") {
    await sql`DELETE FROM agent_access_oauth_pending WHERE id = ${pending.id}`;
    const url = new URL(pending.redirectUri);
    url.searchParams.set("error", "access_denied");
    if (pending.state !== null) {
      url.searchParams.set("state", pending.state);
    }
    return { ok: true, redirectUrl: url.toString() };
  }

  const terms = requireAwcTermsAcceptance({
    acceptTerms: input.acceptTerms,
    termsVersion: input.termsVersion,
  });
  if (!terms.ok) {
    return {
      ok: false,
      status: terms.status,
      code: terms.code,
      error: terms.error,
    };
  }

  await ensureOauthSchema();
  const nowIso = new Date(nowMs).toISOString();
  const issued = await issueOwnedAgentAccessCredential({
    ownerUserId: input.ownerUserId,
    displayName: pending.clientDisplayName,
    termsVersion: terms.termsVersion,
    termsAcceptedAt: nowIso,
    nowMs,
  });
  if (!issued.ok) {
    return {
      ok: false,
      status: issued.status,
      code: issued.code,
      error: issued.error,
    };
  }

  const redirectUrl = await issueOauthAuthCodeAfterConsent({
    pending,
    ownerUserId: input.ownerUserId,
    tokenId: issued.tokenId,
    accessToken: issued.accessToken,
    refreshToken: issued.refreshToken,
    termsVersion: terms.termsVersion,
    nowMs,
    nowIso,
  });
  return { ok: true, redirectUrl };
};
