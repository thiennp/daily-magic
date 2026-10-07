import { buildProjectConnectionCallbackUrl } from "@/lib/projects/connections/buildProjectConnectionAuthorizeUrl";
import type { ProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";

export type ExchangedProjectConnectionTokens = {
  readonly accessToken: string;
  readonly refreshToken: string | null;
  readonly expiresAt: Date | null;
  readonly scopes: readonly string[];
  readonly externalAccountId: string;
  readonly accountLabel: string;
};

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;

const exchangeGithub = async (
  config: ProviderOAuthConfig,
  code: string,
): Promise<ExchangedProjectConnectionTokens | null> => {
  const redirectUri = buildProjectConnectionCallbackUrl();
  const tokenRes = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });
  if (!tokenRes.ok) return null;
  const tokenJson = asRecord(await tokenRes.json().catch(() => null));
  if (tokenJson === null) return null;
  const accessToken =
    typeof tokenJson.access_token === "string" ? tokenJson.access_token : null;
  if (accessToken === null || accessToken.length === 0) return null;
  const scopeRaw =
    typeof tokenJson.scope === "string" ? tokenJson.scope : config.scopes.join(",");
  const scopes = scopeRaw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "AgentWitch-ProjectConnections",
    },
  });
  if (!userRes.ok) return null;
  const userJson = asRecord(await userRes.json().catch(() => null));
  if (userJson === null) return null;
  const id =
    typeof userJson.id === "number"
      ? String(userJson.id)
      : typeof userJson.id === "string"
        ? userJson.id
        : null;
  const login =
    typeof userJson.login === "string" && userJson.login.length > 0
      ? userJson.login
      : null;
  if (id === null || login === null) return null;

  return {
    accessToken,
    refreshToken:
      typeof tokenJson.refresh_token === "string"
        ? tokenJson.refresh_token
        : null,
    expiresAt: null,
    scopes,
    externalAccountId: id,
    accountLabel: login,
  };
};

const exchangeSlack = async (
  config: ProviderOAuthConfig,
  code: string,
): Promise<ExchangedProjectConnectionTokens | null> => {
  const redirectUri = buildProjectConnectionCallbackUrl();
  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: redirectUri,
  });
  const tokenRes = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) return null;
  const tokenJson = asRecord(await tokenRes.json().catch(() => null));
  if (tokenJson === null || tokenJson.ok !== true) return null;

  const accessToken =
    typeof tokenJson.access_token === "string"
      ? tokenJson.access_token
      : null;
  if (accessToken === null || accessToken.length === 0) return null;

  const team = asRecord(tokenJson.team);
  const teamId =
    team !== null && typeof team.id === "string" ? team.id : null;
  const teamName =
    team !== null && typeof team.name === "string" && team.name.length > 0
      ? team.name
      : null;
  const botUserId =
    typeof tokenJson.bot_user_id === "string" ? tokenJson.bot_user_id : null;
  const externalAccountId = teamId ?? botUserId;
  if (externalAccountId === null) return null;

  const scopeRaw =
    typeof tokenJson.scope === "string"
      ? tokenJson.scope
      : config.scopes.join(",");
  const scopes = scopeRaw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return {
    accessToken,
    refreshToken:
      typeof tokenJson.refresh_token === "string"
        ? tokenJson.refresh_token
        : null,
    expiresAt:
      typeof tokenJson.expires_in === "number"
        ? new Date(Date.now() + tokenJson.expires_in * 1000)
        : null,
    scopes,
    externalAccountId,
    accountLabel: teamName ?? externalAccountId,
  };
};

/** Exchange authorization code — Phase 1: GitHub + Slack only. */
export const exchangeProjectConnectionOAuthCode = async (input: {
  readonly config: ProviderOAuthConfig;
  readonly code: string;
}): Promise<ExchangedProjectConnectionTokens | null> => {
  if (input.config.provider === "github") {
    return exchangeGithub(input.config, input.code);
  }
  if (input.config.provider === "slack") {
    return exchangeSlack(input.config, input.code);
  }
  return null;
};
