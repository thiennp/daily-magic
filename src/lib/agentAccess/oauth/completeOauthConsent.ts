import { randomUUID } from "node:crypto";

import { issueOwnedAgentAccessCredential } from "@/lib/agentAccess/issueOwnedAgentAccessCredential";
import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import {
  createOauthAuthorizationCode,
  hashOauthSecret,
} from "@/lib/agentAccess/oauth/hashOauthSecrets";
import { loadOauthPending } from "@/lib/agentAccess/oauth/loadOauthPending";
import { OAUTH_CODE_TTL_MS } from "@/lib/agentAccess/oauth/oauth.constants";
import { requireAwcTermsAcceptance } from "@/lib/agentAccess/requireAwcTermsAcceptance";
import { getSql } from "@/lib/db";

export type CompleteOauthConsentResult =
  | {
      readonly ok: true;
      readonly redirectUrl: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

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
      error: "This connect request expired. Start again from your assistant.",
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
  const issued = await issueOwnedAgentAccessCredential({
    ownerUserId: input.ownerUserId,
    displayName: pending.clientDisplayName,
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

  const code = createOauthAuthorizationCode();
  const authCodeId = randomUUID();
  const nowIso = new Date(nowMs).toISOString();

  await sql`
    INSERT INTO agent_access_oauth_auth_codes (
      id, code_hash, client_id, redirect_uri, code_challenge,
      code_challenge_method, owner_user_id, token_id, terms_version,
      client_display_name, expires_at, created_at
    )
    VALUES (
      ${authCodeId},
      ${hashOauthSecret(code)},
      ${pending.clientId},
      ${pending.redirectUri},
      ${pending.codeChallenge},
      ${pending.codeChallengeMethod},
      ${input.ownerUserId},
      ${issued.tokenId},
      ${terms.termsVersion},
      ${pending.clientDisplayName},
      ${new Date(nowMs + OAUTH_CODE_TTL_MS).toISOString()},
      ${nowIso}
    )
  `;
  await sql`
    INSERT INTO agent_access_oauth_token_delivery (
      auth_code_id, access_token, refresh_token, created_at
    )
    VALUES (
      ${authCodeId},
      ${issued.accessToken},
      ${issued.refreshToken},
      ${nowIso}
    )
  `;
  await sql`DELETE FROM agent_access_oauth_pending WHERE id = ${pending.id}`;

  const url = new URL(pending.redirectUri);
  url.searchParams.set("code", code);
  if (pending.state !== null) {
    url.searchParams.set("state", pending.state);
  }
  return { ok: true, redirectUrl: url.toString() };
};
