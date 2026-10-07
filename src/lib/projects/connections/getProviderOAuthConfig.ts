import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";
import { PROJECT_CONNECTIONS_LIVE_PROVIDERS } from "@/lib/projects/connections/projectConnection.constants";

export type ProviderOAuthConfig = {
  readonly provider: ProjectConnectionProvider;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly authorizeUrl: string;
  readonly tokenUrl: string;
  readonly scopes: readonly string[];
  /** 1 = live OAuth exchange; reserved for future phases. */
  readonly phase: 1 | 2;
};

const LIVE = new Set<string>(PROJECT_CONNECTIONS_LIVE_PROVIDERS);

const readPair = (
  idKey: string,
  secretKey: string,
): { clientId: string; clientSecret: string } | null => {
  const clientId = process.env[idKey];
  const clientSecret = process.env[secretKey];
  if (
    typeof clientId !== "string" ||
    clientId.trim().length === 0 ||
    typeof clientSecret !== "string" ||
    clientSecret.trim().length === 0
  ) {
    return null;
  }
  return { clientId: clientId.trim(), clientSecret: clientSecret.trim() };
};

/**
 * Resolve OAuth app env for a provider. null = unavailable (missing env).
 * Live providers (P1+P2) exchange when env is present; missing env → start 501.
 */
export const getProviderOAuthConfig = (
  provider: ProjectConnectionProvider,
): ProviderOAuthConfig | null => {
  if (provider === "github") {
    const pair = readPair(
      "PROJECT_CONNECTIONS_GITHUB_CLIENT_ID",
      "PROJECT_CONNECTIONS_GITHUB_CLIENT_SECRET",
    );
    if (pair === null) return null;
    return {
      provider,
      ...pair,
      authorizeUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      scopes: ["read:user", "repo"],
      phase: 1,
    };
  }
  if (provider === "slack") {
    const pair = readPair(
      "PROJECT_CONNECTIONS_SLACK_CLIENT_ID",
      "PROJECT_CONNECTIONS_SLACK_CLIENT_SECRET",
    );
    if (pair === null) return null;
    return {
      provider,
      ...pair,
      authorizeUrl: "https://slack.com/oauth/v2/authorize",
      tokenUrl: "https://slack.com/api/oauth.v2.access",
      scopes: ["chat:write", "channels:read", "users:read"],
      phase: 1,
    };
  }
  if (provider === "linear") {
    const pair = readPair(
      "PROJECT_CONNECTIONS_LINEAR_CLIENT_ID",
      "PROJECT_CONNECTIONS_LINEAR_CLIENT_SECRET",
    );
    if (pair === null) return null;
    return {
      provider,
      ...pair,
      authorizeUrl: "https://linear.app/oauth/authorize",
      tokenUrl: "https://api.linear.app/oauth/token",
      // Linear expects comma-separated scopes on authorize.
      scopes: ["read", "write"],
      phase: 1,
    };
  }
  // gmail — personal-first Google OAuth; least privilege for assistant read+send.
  // gmail.readonly is Restricted (verification / possible security assessment).
  // gmail.send is Sensitive. Avoid mail.google.com / gmail.modify.
  const pair = readPair(
    "PROJECT_CONNECTIONS_GOOGLE_CLIENT_ID",
    "PROJECT_CONNECTIONS_GOOGLE_CLIENT_SECRET",
  );
  if (pair === null) return null;
  return {
    provider,
    ...pair,
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scopes: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ],
    phase: 1,
  };
};

export const isLiveOAuthProvider = (
  provider: ProjectConnectionProvider,
): boolean => LIVE.has(provider);

/** @deprecated Prefer isLiveOAuthProvider. */
export const isPhase1Provider = isLiveOAuthProvider;
