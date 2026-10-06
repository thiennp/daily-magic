/** OAuth 2.1 + PKCE (S256) for remote MCP ownership bind (S2). */

export const OAUTH_ISSUER = "https://www.agentwitch.com";

export const OAUTH_MCP_RESOURCE =
  "https://www.agentwitch.com/api/agent-access/mcp";

export const OAUTH_PROTECTED_RESOURCE_METADATA_URL =
  `${OAUTH_ISSUER}/.well-known/oauth-protected-resource`;

export const OAUTH_AUTHORIZATION_SERVER_METADATA_URL =
  `${OAUTH_ISSUER}/.well-known/oauth-authorization-server`;

export const OAUTH_AUTHORIZE_PATH = "/api/agent-access/oauth/authorize";
export const OAUTH_TOKEN_PATH = "/api/agent-access/oauth/token";
export const OAUTH_REGISTER_PATH = "/api/agent-access/oauth/register";
export const OAUTH_REVOKE_PATH = "/api/agent-access/oauth/revoke";
export const OAUTH_CONSENT_PATH = "/oauth/consent";

export const OAUTH_AUTHORIZE_URL = `${OAUTH_ISSUER}${OAUTH_AUTHORIZE_PATH}`;
export const OAUTH_TOKEN_URL = `${OAUTH_ISSUER}${OAUTH_TOKEN_PATH}`;
export const OAUTH_REGISTER_URL = `${OAUTH_ISSUER}${OAUTH_REGISTER_PATH}`;
export const OAUTH_REVOKE_URL = `${OAUTH_ISSUER}${OAUTH_REVOKE_PATH}`;
export const OAUTH_CONSENT_URL = `${OAUTH_ISSUER}${OAUTH_CONSENT_PATH}`;

/** Auth code + pending authorize TTL. */
export const OAUTH_CODE_TTL_MS = 10 * 60 * 1000;

export const OAUTH_PKCE_METHOD = "S256" as const;

export const OAUTH_SCOPES_SUPPORTED = ["agent_access"] as const;

/** v1 redirect policy: https + localhost loopback. Host allowlist TBD (open Q). */
export const OAUTH_LOCALHOST_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "[::1]",
]);

export const OAUTH_CLIENT_NAME_MAX = 80;
