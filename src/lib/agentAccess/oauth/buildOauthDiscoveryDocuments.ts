import {
  OAUTH_AUTHORIZATION_SERVER_METADATA_URL,
  OAUTH_AUTHORIZE_URL,
  OAUTH_ISSUER,
  OAUTH_MCP_RESOURCE,
  OAUTH_PROTECTED_RESOURCE_METADATA_URL,
  OAUTH_REGISTER_URL,
  OAUTH_REVOKE_URL,
  OAUTH_SCOPES_SUPPORTED,
  OAUTH_TOKEN_URL,
} from "@/lib/agentAccess/oauth/oauth.constants";

export const buildOauthProtectedResourceMetadata = () => ({
  resource: OAUTH_MCP_RESOURCE,
  authorization_servers: [OAUTH_ISSUER],
  scopes_supported: [...OAUTH_SCOPES_SUPPORTED],
  bearer_methods_supported: ["header"],
  resource_documentation: "https://www.agentwitch.com/for-agents",
});

export const buildOauthAuthorizationServerMetadata = () => ({
  issuer: OAUTH_ISSUER,
  authorization_endpoint: OAUTH_AUTHORIZE_URL,
  token_endpoint: OAUTH_TOKEN_URL,
  registration_endpoint: OAUTH_REGISTER_URL,
  revocation_endpoint: OAUTH_REVOKE_URL,
  code_challenge_methods_supported: ["S256"],
  response_types_supported: ["code"],
  grant_types_supported: ["authorization_code", "refresh_token"],
  token_endpoint_auth_methods_supported: [
    "client_secret_post",
    "none",
  ],
  scopes_supported: [...OAUTH_SCOPES_SUPPORTED],
  revocation_endpoint_auth_methods_supported: [
    "client_secret_post",
    "none",
  ],
  // Help clients find metadata URLs.
  metadata_urls: {
    protected_resource: OAUTH_PROTECTED_RESOURCE_METADATA_URL,
    authorization_server: OAUTH_AUTHORIZATION_SERVER_METADATA_URL,
  },
});

export const buildMcpWwwAuthenticateHeader = (): string =>
  `Bearer realm="agentwitch", resource_metadata="${OAUTH_PROTECTED_RESOURCE_METADATA_URL}", scope="agent_access"`;
