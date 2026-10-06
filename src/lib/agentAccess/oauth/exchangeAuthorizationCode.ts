import { authenticateOauthTokenClient } from "@/lib/agentAccess/oauth/authenticateOauthTokenClient";
import { deliverOauthAuthCodeTokens } from "@/lib/agentAccess/oauth/deliverOauthAuthCodeTokens";
import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import type { ExchangeAuthorizationCodeResult } from "@/lib/agentAccess/oauth/ExchangeAuthorizationCodeResult.type";
import { loadOauthAuthCodeForExchange } from "@/lib/agentAccess/oauth/loadOauthAuthCodeForExchange";

export type { ExchangeAuthorizationCodeResult };

export const exchangeAuthorizationCode = async (input: {
  readonly code: string;
  readonly redirectUri: string;
  readonly clientId: string;
  readonly clientSecret: string | null;
  readonly codeVerifier: string;
  readonly nowMs?: number;
}): Promise<ExchangeAuthorizationCodeResult> => {
  await ensureOauthSchema();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();

  const clientAuth = await authenticateOauthTokenClient({
    clientId: input.clientId,
    clientSecret: input.clientSecret,
  });
  if (!("client" in clientAuth)) {
    return clientAuth;
  }

  const loaded = await loadOauthAuthCodeForExchange({
    code: input.code,
    redirectUri: input.redirectUri,
    clientId: input.clientId,
    codeVerifier: input.codeVerifier,
    nowMs,
  });
  if (!("row" in loaded)) {
    return loaded;
  }

  return deliverOauthAuthCodeTokens({
    authCodeId: loaded.row.id,
    nowIso,
  });
};
