import { randomUUID } from "node:crypto";

import {
  createOauthAuthorizationCode,
  hashOauthSecret,
} from "@/lib/agentAccess/oauth/hashOauthSecrets";
import { OAUTH_CODE_TTL_MS } from "@/lib/agentAccess/oauth/oauth.constants";
import { getSql } from "@/lib/db";

/** Stage one-time auth code + plaintext delivery, return redirect with code. */
export const issueOauthAuthCodeAfterConsent = async (input: {
  readonly pending: {
    readonly id: string;
    readonly clientId: string;
    readonly redirectUri: string;
    readonly codeChallenge: string;
    readonly codeChallengeMethod: string;
    readonly state: string | null;
    readonly clientDisplayName: string | null;
  };
  readonly ownerUserId: string;
  readonly tokenId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly termsVersion: string;
  readonly nowMs: number;
  readonly nowIso: string;
}): Promise<string> => {
  const sql = getSql();
  const code = createOauthAuthorizationCode();
  const authCodeId = randomUUID();

  await sql`
    INSERT INTO agent_access_oauth_auth_codes (
      id, code_hash, client_id, redirect_uri, code_challenge,
      code_challenge_method, owner_user_id, token_id, terms_version,
      client_display_name, expires_at, created_at
    )
    VALUES (
      ${authCodeId},
      ${hashOauthSecret(code)},
      ${input.pending.clientId},
      ${input.pending.redirectUri},
      ${input.pending.codeChallenge},
      ${input.pending.codeChallengeMethod},
      ${input.ownerUserId},
      ${input.tokenId},
      ${input.termsVersion},
      ${input.pending.clientDisplayName},
      ${new Date(input.nowMs + OAUTH_CODE_TTL_MS).toISOString()},
      ${input.nowIso}
    )
  `;
  await sql`
    INSERT INTO agent_access_oauth_token_delivery (
      auth_code_id, access_token, refresh_token, created_at
    )
    VALUES (
      ${authCodeId},
      ${input.accessToken},
      ${input.refreshToken},
      ${input.nowIso}
    )
  `;
  await sql`DELETE FROM agent_access_oauth_pending WHERE id = ${input.pending.id}`;

  const url = new URL(input.pending.redirectUri);
  url.searchParams.set("code", code);
  if (input.pending.state !== null) {
    url.searchParams.set("state", input.pending.state);
  }
  return url.toString();
};
