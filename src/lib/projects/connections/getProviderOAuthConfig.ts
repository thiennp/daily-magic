import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";
import { PROVIDER_OAUTH_SPECS } from "@/lib/projects/connections/providerOAuthSpecs";
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
 * Live providers exchange when env is present; missing env → start 501.
 */
export const getProviderOAuthConfig = (
  provider: ProjectConnectionProvider,
): ProviderOAuthConfig | null => {
  const spec = PROVIDER_OAUTH_SPECS[provider];
  if (spec === undefined) return null;
  const pair = readPair(
    `PROJECT_CONNECTIONS_${spec.envPrefix}_CLIENT_ID`,
    `PROJECT_CONNECTIONS_${spec.envPrefix}_CLIENT_SECRET`,
  );
  if (pair === null) return null;
  return {
    provider,
    ...pair,
    authorizeUrl: spec.authorizeUrl,
    tokenUrl: spec.tokenUrl,
    scopes: spec.scopes,
    phase: 1,
  };
};

export const isLiveOAuthProvider = (
  provider: ProjectConnectionProvider,
): boolean => LIVE.has(provider);

/** @deprecated Prefer isLiveOAuthProvider. */
export const isPhase1Provider = isLiveOAuthProvider;
