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

const parseScopeList = (
  raw: unknown,
  fallback: readonly string[],
): readonly string[] => {
  if (Array.isArray(raw)) {
    return raw
      .filter((s): s is string => typeof s === "string")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  if (typeof raw === "string") {
    return raw
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [...fallback];
};

const expiresAtFromExpiresIn = (expiresIn: unknown): Date | null =>
  typeof expiresIn === "number" && Number.isFinite(expiresIn) && expiresIn > 0
    ? new Date(Date.now() + expiresIn * 1000)
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
  const scopes = parseScopeList(tokenJson.scope, config.scopes);

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

  const scopes = parseScopeList(tokenJson.scope, config.scopes);

  return {
    accessToken,
    refreshToken:
      typeof tokenJson.refresh_token === "string"
        ? tokenJson.refresh_token
        : null,
    expiresAt: expiresAtFromExpiresIn(tokenJson.expires_in),
    scopes,
    externalAccountId,
    accountLabel: teamName ?? externalAccountId,
  };
};

const exchangeLinear = async (
  config: ProviderOAuthConfig,
  code: string,
): Promise<ExchangedProjectConnectionTokens | null> => {
  const redirectUri = buildProjectConnectionCallbackUrl();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const tokenRes = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) return null;
  const tokenJson = asRecord(await tokenRes.json().catch(() => null));
  if (tokenJson === null) return null;
  const accessToken =
    typeof tokenJson.access_token === "string" ? tokenJson.access_token : null;
  if (accessToken === null || accessToken.length === 0) return null;
  const scopes = parseScopeList(tokenJson.scope, config.scopes);

  const viewerRes = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: "{ viewer { id name email } }",
    }),
  });
  if (!viewerRes.ok) return null;
  const viewerJson = asRecord(await viewerRes.json().catch(() => null));
  if (viewerJson === null) return null;
  const data = asRecord(viewerJson.data);
  const viewer = data !== null ? asRecord(data.viewer) : null;
  if (viewer === null) return null;
  const id = typeof viewer.id === "string" ? viewer.id : null;
  if (id === null || id.length === 0) return null;
  const name =
    typeof viewer.name === "string" && viewer.name.trim().length > 0
      ? viewer.name.trim()
      : null;
  const email =
    typeof viewer.email === "string" && viewer.email.trim().length > 0
      ? viewer.email.trim()
      : null;

  return {
    accessToken,
    refreshToken:
      typeof tokenJson.refresh_token === "string"
        ? tokenJson.refresh_token
        : null,
    expiresAt: expiresAtFromExpiresIn(tokenJson.expires_in),
    scopes,
    externalAccountId: id,
    accountLabel: name ?? email ?? id,
  };
};

const exchangeGmail = async (
  config: ProviderOAuthConfig,
  code: string,
): Promise<ExchangedProjectConnectionTokens | null> => {
  const redirectUri = buildProjectConnectionCallbackUrl();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const tokenRes = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) return null;
  const tokenJson = asRecord(await tokenRes.json().catch(() => null));
  if (tokenJson === null) return null;
  const accessToken =
    typeof tokenJson.access_token === "string" ? tokenJson.access_token : null;
  if (accessToken === null || accessToken.length === 0) return null;
  // Offline consent should return a refresh_token; without it later refresh fails → expired.
  const refreshToken =
    typeof tokenJson.refresh_token === "string"
      ? tokenJson.refresh_token
      : null;
  const scopes = parseScopeList(tokenJson.scope, config.scopes);

  const profileRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/profile",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  if (!profileRes.ok) return null;
  const profileJson = asRecord(await profileRes.json().catch(() => null));
  if (profileJson === null) return null;
  const email =
    typeof profileJson.emailAddress === "string" &&
    profileJson.emailAddress.trim().length > 0
      ? profileJson.emailAddress.trim()
      : null;
  if (email === null) return null;

  return {
    accessToken,
    refreshToken,
    expiresAt: expiresAtFromExpiresIn(tokenJson.expires_in),
    scopes,
    externalAccountId: email,
    accountLabel: email,
  };
};

/** Exchange authorization code — live providers: GitHub, Slack, Linear, Gmail. */
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
  if (input.config.provider === "linear") {
    return exchangeLinear(input.config, input.code);
  }
  if (input.config.provider === "gmail") {
    return exchangeGmail(input.config, input.code);
  }
  return null;
};
